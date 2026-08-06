#!/bin/bash
# iNAYATechLab - Push to Gift Repository (Auto Sync)
# Usage: bash scripts/push-to-gift.sh [gift-repo-name] [commit-message]
# Requires: GITHUB_TOKEN in .env.secret (AES-256 encrypted) or env

set -e

GIFT_REPO=${1:-"manpower-agency-saas-gift"}
COMMIT_MSG=${2:-"chore: sync to gift repo - $(date +%Y-%m-%d)"}
OWNER="iNAYATechLab"
PRIMARY_REPO="manpower-agency-saas"

echo "🎁 iNAYATechLab Gift Sync"
echo "   Primary: $OWNER/$PRIMARY_REPO (private)"
echo "   Gift:    $OWNER/$GIFT_REPO"
echo ""

# Load token from .env.secret if exists
if [ -f ".env.secret" ]; then
  # Try to get encrypted token
  ENC_TOKEN=$(grep GITHUB_TOKEN_ENCRYPTED .env.secret | cut -d'=' -f2 | tr -d '"' | tr -d "'")
  ENC_KEY=$(grep ENCRYPTION_KEY .env.local | cut -d'=' -f2 | tr -d '"' | tr -d "'")
  if [ -z "$ENC_KEY" ]; then
    ENC_KEY=$(grep ENCRYPTION_KEY .env.secret | cut -d'=' -f2 | tr -d '"' | tr -d "'" )
  fi
  # For now, try plain GITHUB_TOKEN env
  TOKEN=${GITHUB_TOKEN:-""}
  if [ -z "$TOKEN" ] && [ -n "$ENC_TOKEN" ]; then
    echo "⚠ Encrypted token found but decryption needs Node. Using GITHUB_TOKEN env if set."
  fi
fi

TOKEN=${GITHUB_TOKEN:-$TOKEN}

if [ -z "$TOKEN" ]; then
  echo "⚠ GITHUB_TOKEN not set!"
  echo "  Running in DRY-RUN mode - will show git commands without pushing."
  echo ""
  echo "  To enable real push:"
  echo "  1. Create PAT at https://github.com/settings/tokens (scope: repo, workflow)"
  echo "  2. export GITHUB_TOKEN=ghp_xxxxxxxx"
  echo "  3. bash scripts/push-to-gift.sh"
  echo ""
  DRY_RUN=1
else
  DRY_RUN=0
fi

# Check gift remote
GIFT_URL="https://github.com/$OWNER/$GIFT_REPO.git"
if [ $DRY_RUN -eq 0 ]; then
  GIFT_URL_AUTH="https://${TOKEN}@github.com/${OWNER}/${GIFT_REPO}.git"
fi

echo "▶ Checking gift remote..."
if git remote | grep -q "^gift$"; then
  echo "  gift remote exists, updating URL..."
  if [ $DRY_RUN -eq 0 ]; then
    git remote set-url gift "$GIFT_URL_AUTH"
  fi
else
  echo "  Adding gift remote..."
  if [ $DRY_RUN -eq 0 ]; then
    git remote add gift "$GIFT_URL_AUTH"
  else
    echo "  [DRY-RUN] git remote add gift $GIFT_URL"
  fi
fi

echo "▶ Current branch: $(git branch --show-current)"
echo "▶ Last commit: $(git log --oneline -1)"
echo ""

# Sanitize check - ensure no secret files are tracked
if git ls-files | grep -q ".env.secret"; then
  echo "✗ ERROR: .env.secret is tracked! Aborting. Check .gitignore"
  exit 1
fi
if git ls-files | grep -q ".env.local"; then
  echo "✗ ERROR: .env.local is tracked! Aborting."
  exit 1
fi
echo "✓ Secret check passed (no .env.secret in git)"

# Create sanitized commit if needed (remove secrets from history - here we just verify)
echo ""
if [ $DRY_RUN -eq 1 ]; then
  echo "[DRY-RUN] Would execute:"
  echo "  git push gift main --force"
  echo "  git push gift --tags"
  echo ""
  echo "✓ DRY-RUN complete. Set GITHUB_TOKEN to push for real."
else
  echo "▶ Pushing to gift repo..."
  git push gift main --force
  echo "✓ Pushed main to gift"
  # Push tags if any
  git push gift --tags || echo "  No tags to push"
  echo ""
  echo "🎉 Gift sync complete!"
  echo "   View at: https://github.com/$OWNER/$GIFT_REPO"
fi
