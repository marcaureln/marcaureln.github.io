FROM node:24.15.0-bookworm

ARG TZ=UTC
ENV TZ="$TZ"

ARG CLAUDE_CODE_VERSION=2.1.325
ARG PNPM_VERSION=11.11.0

# Basic development tools (from Anthropic's Claude Code dev container, without the firewall)
RUN apt-get update && apt-get install -y --no-install-recommends \
  less \
  git \
  procps \
  fzf \
  zsh \
  man-db \
  unzip \
  gnupg2 \
  gh \
  jq \
  nano \
  vim \
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# The build reads git history of content files (scripts/git-history.ts); the checkout may belong to another uid.
RUN git config --system --add safe.directory '*'

# pnpm, pinned to the packageManager field of package.json
RUN npm install -g pnpm@${PNPM_VERSION}

# Claude Code
RUN npm install -g @anthropic-ai/claude-code@${CLAUDE_CODE_VERSION}

ENV SHELL=/bin/zsh
ENV EDITOR=nano
ENV VISUAL=nano
