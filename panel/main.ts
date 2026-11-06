import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';

const host = connectHost();
const root = document.querySelector('#root');

let mounted = false;
let surface = 'panel';
let sessionId = null;
let sessionTitle = '';
let usage = null;
let errorText = '';
let loading = true;
let requestSerial = 0;
let timer = undefined;

const escapeHtml = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const formatCompact = (value) => {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) return '0';
  if (number >= 1e9) return `${(number / 1e9).toFixed(2)}B`;
  if (number >= 1e6) return `${(number / 1e6).toFixed(2)}M`;
  if (number >= 1e3) return `${(number / 1e3).toFixed(1)}K`;
  return String(Math.round(number));
};

const formatFull = (value) => {
  const number = Number(value);
  if (!Number.isFinite(number)) return '0';
  return Math.round(number).toLocaleString('zh-CN');
};

const formatCost = (value) => {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) return '$0.0000';
  if (number < 0.0001) return '<$0.0001';
  return `$${number.toFixed(4)}`;
};

const formatClock = (timestamp) => {
  if (!timestamp || !Number.isFinite(timestamp)) return '';
  return new Date(timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

const cacheHitRate = (tokens) => {
  const input = tokens.input + tokens.cacheRead + tokens.cacheWrite;
  if (input <= 0) return '—';
  return `${Math.min(100, (tokens.cacheRead / input) * 100).toFixed(1)}%`;
};

const renderState = (title, body, isError = false) => {
  if (!root) return;
  root.innerHTML = `
    <div class="state">
      <div class="state-title ${isError ? 'state-error' : ''}">${escapeHtml(title)}</div>
      ${body ? `<div class="state-body">${escapeHtml(body)}</div>` : ''}
    </div>
  `;
};

const renderPanel = () => {
  if (!root) return;
  const tokens = usage?.tokens ?? { input: 0, output: 0, reasoning: 0, cacheRead: 0, cacheWrite: 0, total: 0 };
  const children = usage?.includingChildren;
  const updated = formatClock(usage?.updatedAt);

  root.innerHTML = `
    <div class="panel">
      <div class="card">
        <div class="card-head">
          <span class="card-title">当前会话累计</span>
          <span class="muted mono">${escapeHtml(sessionTitle || '')}</span>
        </div>
        <div class="card-total mono">${formatCompact(tokens.total)}<span class="card-total-unit">tokens</span></div>
        <div class="card-sub muted">${updated ? `更新于 ${escapeHtml(updated)}` : '总计'} · ${escapeHtml(formatFull(tokens.total))} tokens</div>
      </div>
      <div class="grid">
        <div class="cell"><div class="cell-label">输入</div><div class="cell-value mono">${formatCompact(tokens.input)}</div></div>
        <div class="cell"><div class="cell-label">输出</div><div class="cell-value mono">${formatCompact(tokens.output)}</div></div>
        <div class="cell"><div class="cell-label">推理</div><div class="cell-value mono">${formatCompact(tokens.reasoning)}</div></div>
        <div class="cell"><div class="cell-label">缓存读取</div><div class="cell-value mono">${formatCompact(tokens.cacheRead)}</div></div>
        <div class="cell"><div class="cell-label">缓存写入</div><div class="cell-value mono">${formatCompact(tokens.cacheWrite)}</div></div>
        <div class="cell"><div class="cell-label">缓存命中</div><div class="cell-value mono accent">${escapeHtml(cacheHitRate(tokens))}</div></div>
      </div>
      <div class="children muted">
        <span>成本 ${escapeHtml(formatCost(usage?.cost))}</span>
        ${children ? `<span>含子会话 ${children.sessions} 个 · ${formatCompact(children.tokens.total)}</span>` : ''}
      </div>
    </div>
  `;
};

const renderStatus = () => {
  if (!root) return;
  const tokens = usage?.tokens ?? { input: 0, output: 0, reasoning: 0, cacheRead: 0, cacheWrite: 0, total: 0 };
  const children = usage?.includingChildren;

  root.innerHTML = `
    <div class="status">
      <div class="status-head">
        <span class="status-label">会话 Token</span>
        <span class="status-total mono">${formatCompact(tokens.total)}<span class="status-total-unit">tokens</span></span>
      </div>
      <div class="status-line">
        <span>↑ <b class="mono">${formatCompact(tokens.input)}</b></span>
        <span>↓ <b class="mono">${formatCompact(tokens.output)}</b></span>
        <span>推理 <b class="mono">${formatCompact(tokens.reasoning)}</b></span>
        <span>缓存 <b class="mono">${formatCompact(tokens.cacheRead)}</b></span>
      </div>
      <div class="status-line">
        <span>${escapeHtml(formatCost(usage?.cost))}</span>
        ${children ? `<span>含子会话 ${formatCompact(children.tokens.total)}</span>` : ''}
      </div>
    </div>
  `;
};

const render = () => {
  if (!root) return;
  document.body.dataset.surface = surface;
  if (!sessionId) {
    renderState('未打开会话', '打开一个会话后显示累计 token。');
    return;
  }
  if (loading && !usage) {
    renderState('读取中', '正在读取会话累计 token…');
    return;
  }
  if (errorText && !usage) {
    renderState('无法读取用量', errorText, true);
    return;
  }
  if (surface === 'status') renderStatus();
  else renderPanel();
  if (errorText) {
    root.insertAdjacentHTML('beforeend', `<div class="state-body state-error" style="margin-top:6px">${escapeHtml(errorText)}</div>`);
  }
};

const describeError = (error) => {
  const code = error?.code ?? '';
  if (code === 'NO_SERVICE') return '本地服务未启动或未授权。请在 设置 → 扩展 中批准此扩展。';
  if (code === 'SERVICE_FAILED') return '本地服务启动失败。请检查扩展是否已启用。';
  if (code === 'REQUEST_FAILED' || code === 'HOST_TIMEOUT') return '本地服务没有响应。请重新打开面板或重启 OpenChamber。';
  if (code === 'DISABLED') return '扩展已被暂停。请在 设置 → 扩展 中启用它。';
  return error?.message ? `${code ? `${code}: ` : ''}${error.message}` : '未知错误';
};

const describeHttpError = (body, status) => {
  let parsed = null;
  try {
    parsed = JSON.parse(body);
  } catch {
    parsed = null;
  }
  if (parsed?.error === 'db-missing') return '找不到 OpenCode 数据库（opencode.db）。';
  if (parsed?.error === 'schema-unsupported') return '当前 OpenCode 数据库没有可读取的会话 token 表。';
  if (parsed?.error === 'session-not-found') return '这个会话还没有 token 记录。';
  if (parsed?.message) return parsed.message;
  return `服务返回 HTTP ${status}`;
};

const refresh = async () => {
  const currentSession = sessionId;
  if (!currentSession) {
    usage = null;
    loading = false;
    errorText = '';
    render();
    return;
  }

  const serial = ++requestSerial;
  try {
    const result = await host.serviceRequest({
      method: 'GET',
      path: '/usage',
      query: { sessionId: currentSession },
    });
    if (serial !== requestSerial || currentSession !== sessionId) return;
    if (result.status === 200) {
      const parsed = JSON.parse(result.body);
      usage = parsed;
      errorText = '';
      sessionTitle = parsed.title || sessionTitle;
    } else {
      errorText = describeHttpError(result.body, result.status);
    }
  } catch (error) {
    if (serial !== requestSerial || currentSession !== sessionId) return;
    errorText = describeError(error);
  } finally {
    if (serial === requestSerial) {
      loading = false;
      render();
    }
  }
};

const startPolling = () => {
  if (timer !== undefined) return;
  timer = window.setInterval(() => {
    void refresh();
  }, 2000);
};

host.onReady((ctx) => {
  applyHostReady(ctx, document.documentElement);
  document.body.dataset.theme = ctx.theme?.mode === 'dark' ? 'dark' : 'light';
  surface = ctx.surface === 'status' ? 'status' : 'panel';
  sessionId = ctx.session?.id ?? null;
  sessionTitle = ctx.session?.title ?? sessionTitle;
  document.body.dataset.surface = surface;
  if (!mounted) {
    mounted = true;
    render();
    void refresh();
    startPolling();
  } else {
    render();
    void refresh();
  }
});

host.onSession((session) => {
  const nextId = session?.id ?? null;
  const changed = nextId !== sessionId;
  sessionId = nextId;
  if (session?.title) sessionTitle = session.title;
  if (changed) {
    usage = null;
    errorText = '';
    loading = Boolean(nextId);
    render();
    void refresh();
  }
});

host.onSessionLifecycle((event) => {
  if (event?.phase === 'completed') void refresh();
});

window.addEventListener('beforeunload', () => {
  if (timer !== undefined) window.clearInterval(timer);
  host.dispose();
});
