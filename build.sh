#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

SDK_PATH="${OPENCHAMBER_SDK_PATH:-}"

if [ -z "$SDK_PATH" ]; then
  NPM_ROOT="$(npm root -g 2>/dev/null || true)"
  for candidate in \
    "$NPM_ROOT/@openchamber/web/node_modules/@openchamber/sdk" \
    "$HOME/.npm-global/lib/node_modules/@openchamber/web/node_modules/@openchamber/sdk" \
    "/usr/local/lib/node_modules/@openchamber/web/node_modules/@openchamber/sdk" \
    "/usr/lib/node_modules/@openchamber/web/node_modules/@openchamber/sdk"; do
    if [ -n "$candidate" ] && [ -d "$candidate" ]; then
      SDK_PATH="$candidate"
      break
    fi
  done
fi

if [ -z "$SDK_PATH" ] || [ ! -d "$SDK_PATH" ]; then
  echo "Could not find @openchamber/sdk." >&2
  echo "Install OpenChamber globally or set OPENCHAMBER_SDK_PATH to the SDK directory." >&2
  exit 1
fi

mkdir -p node_modules/@openchamber
ln -sfn "$SDK_PATH" node_modules/@openchamber/sdk

npx --yes esbuild@0.28.2 panel/main.ts \
  --bundle \
  --format=iife \
  --platform=browser \
  --target=es2020 \
  --minify \
  --outfile=panel/main.js

echo "Built panel/main.js"
