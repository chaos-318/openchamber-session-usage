import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { timingSafeEqual } from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';

const port = Number(process.env.OPENCHAMBER_SERVICE_PORT);
const token = process.env.OPENCHAMBER_SERVICE_TOKEN ?? '';

if (!port || !token) {
  console.error('OPENCHAMBER_SERVICE_PORT and OPENCHAMBER_SERVICE_TOKEN are required');
  process.exit(1);
}

const dataHome = process.env.XDG_DATA_HOME || path.join(os.homedir(), '.local', 'share');
const dbPath = process.env.OPENCODE_DB || path.join(dataHome, 'opencode', 'opencode.db');

const SESSION_ID = /^ses_[A-Za-z0-9]+$/;
const TABLES = ['session_v2', 'session'];
const TOKEN_COLUMNS = [
  ['input', 'tokens_input'],
  ['output', 'tokens_output'],
  ['reasoning', 'tokens_reasoning'],
  ['cacheRead', 'tokens_cache_read'],
  ['cacheWrite', 'tokens_cache_write'],
];

class ServiceError extends Error {
  constructor(code, message, status = 400) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

const safeEqual = (left, right) => {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
};

const authorize = (req) => {
  const header = req.headers.authorization ?? '';
  const expected = `Bearer ${token}`;
  return safeEqual(header, expected);
};

const openDatabase = () => {
  try {
    return new DatabaseSync(dbPath, { readOnly: true });
  } catch (error) {
    if (error?.code === 'ENOENT' || /unable to open database/i.test(String(error?.message))) {
      throw new ServiceError('db-missing', `OpenCode database not found: ${dbPath}`, 503);
    }
    throw error;
  }
};

const hasTable = (db, table) => {
  const row = db.prepare("select name from sqlite_master where type = 'table' and name = ?").get(table);
  return Boolean(row);
};

const tableColumns = (db, table) => {
  const columns = db.prepare(`pragma table_info('${table}')`).all();
  return new Set(columns.map((column) => column.name));
};

const readTotal = (value) => (typeof value === 'number' && Number.isFinite(value) && value > 0 ? value : 0);

const zeroTokens = () => ({
  input: 0,
  output: 0,
  reasoning: 0,
  cacheRead: 0,
  cacheWrite: 0,
  total: 0,
});

const tokenTotal = (tokens) => tokens.input + tokens.output + tokens.reasoning + tokens.cacheRead + tokens.cacheWrite;

const pickTokenColumns = (columns) => TOKEN_COLUMNS
  .filter(([, column]) => columns.has(column))
  .map(([key, column]) => `${column} as ${key}`);

const readSession = (sessionId) => {
  const db = openDatabase();
  try {
    let supportedTableSeen = false;
    for (const table of TABLES) {
      if (!hasTable(db, table)) continue;
      const columns = tableColumns(db, table);
      if (!columns.has('id') || !columns.has('tokens_input')) continue;
      supportedTableSeen = true;

      const tokenColumns = pickTokenColumns(columns);
      const select = [
        'id',
        columns.has('title') ? 'title' : "'' as title",
        columns.has('cost') ? 'cost' : '0 as cost',
        columns.has('parent_id') ? 'parent_id' : 'null as parent_id',
        columns.has('time_updated') ? 'time_updated' : 'null as time_updated',
        ...tokenColumns,
      ].join(', ');

      const row = db.prepare(`select ${select} from ${table} where id = ?`).get(sessionId);
      if (!row) continue;

      const tokens = zeroTokens();
      for (const [key] of TOKEN_COLUMNS) {
        tokens[key] = readTotal(row[key]);
      }
      tokens.total = tokenTotal(tokens);

      let includingChildren = null;
      if (columns.has('parent_id')) {
        const tree = db.prepare(`
          with recursive descendants(id) as (
            select id from ${table} where id = ?
            union
            select child.id from ${table} child join descendants parent on child.parent_id = parent.id
          )
          select
            count(*) as sessions,
            ${columns.has('cost') ? 'coalesce(sum(cost), 0)' : '0'} as cost,
            ${tokenColumns.length ? tokenColumns.map((column) => `coalesce(sum(${column.split(' as ')[0]}), 0) as ${column.split(' as ')[1]}`).join(', ') : '0 as input'}
          from ${table}
          where id in (select id from descendants)
        `).get(sessionId);

        if (tree && Number(tree.sessions) > 1) {
          const childTokens = zeroTokens();
          for (const [key] of TOKEN_COLUMNS) {
            childTokens[key] = readTotal(tree[key]);
          }
          childTokens.total = tokenTotal(childTokens);
          includingChildren = {
            sessions: Number(tree.sessions),
            cost: Number(tree.cost) || 0,
            tokens: childTokens,
          };
        }
      }

      return {
        sessionId: row.id,
        title: row.title || '',
        cost: Number(row.cost) || 0,
        tokens,
        includingChildren,
        updatedAt: row.time_updated ?? null,
        table,
      };
    }

    if (supportedTableSeen) {
      throw new ServiceError('session-not-found', `No stored usage for session ${sessionId}`, 404);
    }
    throw new ServiceError('schema-unsupported', 'No supported session table found in the OpenCode database', 503);
  } finally {
    db.close();
  }
};

const sendJson = (res, status, body) => {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Content-Length': Buffer.byteLength(payload),
  });
  res.end(payload);
};

const route = (req, res) => {
  const url = new URL(req.url ?? '/', 'http://127.0.0.1');

  if (url.pathname === '/health') {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (!authorize(req)) {
    sendJson(res, 401, { error: 'unauthorized' });
    return;
  }

  if (req.method !== 'GET' || url.pathname !== '/usage') {
    sendJson(res, 404, { error: 'not-found' });
    return;
  }

  const sessionId = url.searchParams.get('sessionId') ?? '';
  if (!SESSION_ID.test(sessionId)) {
    sendJson(res, 400, { error: 'invalid-session-id' });
    return;
  }

  try {
    const usage = readSession(sessionId);
    sendJson(res, 200, usage);
  } catch (error) {
    if (error instanceof ServiceError) {
      sendJson(res, error.status, { error: error.code, message: error.message });
      return;
    }
    console.error('session-usage service failed', error);
    sendJson(res, 500, { error: 'read-failed', message: String(error?.message ?? error) });
  }
};

const server = http.createServer((req, res) => {
  try {
    route(req, res);
  } catch (error) {
    console.error('session-usage service failed', error);
    if (!res.headersSent) sendJson(res, 500, { error: 'internal', message: String(error?.message ?? error) });
    else res.end();
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`session-usage service listening on 127.0.0.1:${port}`);
});

const shutdown = () => {
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 1500).unref();
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
