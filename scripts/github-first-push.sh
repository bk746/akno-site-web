#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

REMOTE="https://github.com/bk746/akno-site-web.git"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  git init -b main
fi

git add -A
if git diff --cached --quiet; then
  echo "Rien à committer (working tree propre)."
else
  git commit -m "$(cat <<'EOF'
Initial commit: site vitrine AKNO (Next.js).

EOF
)"
fi

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REMOTE"
else
  git remote add origin "$REMOTE"
fi

git branch -M main
git push -u origin main

echo "OK — dépôt: $REMOTE"
