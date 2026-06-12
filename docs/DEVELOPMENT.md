# Development Guide

## Prerequisites

Major versions are enforced — install will **fail** if your runtime does not match:

| Tool | Required version | Pinned locally |
|------|------------------|----------------|
| **Node.js** | `20.x` | `.node-version` → `20.19.0` |
| **pnpm** | `10.x` | `packageManager` → `pnpm@10.24.0` |

Enforced via `package.json` → `engines`, `.npmrc` → `engine-strict=true`, and the `preinstall` script (blocks npm/yarn). Use major-only ranges in `engines` so Vercel (and other hosts) can run any compatible patch release.

### One-time tooling setup

```bash
# Enable Corepack (ships with Node) — activates the pnpm version from packageManager
corepack enable
corepack prepare pnpm@10.24.0 --activate

# Node version (pick one that you use)
nvm install 20.19.0 && nvm use 20.19.0   # nvm — reads .node-version
# fnm use                                 # fnm — reads .node-version
```

Verify:

```bash
node -v   # v20.19.0
pnpm -v   # 10.24.0
```

## Setup

```bash
pnpm install
cp .env.local.example .env.local   # then fill in Supabase keys
pnpm dev
```

See [SUPABASE_SETUP.md](../SUPABASE_SETUP.md) for database setup.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Next.js dev server |
| `pnpm build` | Production build |
| `pnpm start` | Run production server |
| `pnpm lint` | ESLint check (all files) |
| `pnpm lint:fix` | ESLint with auto-fix |
| `pnpm typecheck` | TypeScript check (`tsc --noEmit`) |

## Git hooks (Husky)

This project uses [Husky](https://typicode.github.io/husky/) to run checks before each commit.

### Pre-commit

When you run `git commit`, the **pre-commit** hook automatically:

1. Runs **lint-staged** on staged files only
2. Executes `eslint --fix` on staged `*.{js,jsx,ts,tsx,mjs}` files

Config files:

- `.husky/pre-commit` — hook entry point
- `lint-staged.config.mjs` — which commands run on staged files
- `eslint.config.mjs` — ESLint rules (Next.js core-web-vitals + TypeScript)

### First-time setup for contributors

Hooks are installed automatically when you run:

```bash
pnpm install
```

The `prepare` script in `package.json` runs `husky`, which registers Git hooks.

If hooks are missing after clone, run manually:

```bash
pnpm prepare
```

### Bypass (emergency only)

```bash
git commit --no-verify -m "your message"
```

Use sparingly — skips lint checks.

## CI / GitHub Actions

On every push or PR to `main` / `develop`, GitHub Actions runs lint and build automatically.

See [GITFLOW.md](./GITFLOW.md) for branching strategy and CI details.

## Project structure (high level)

```
app/              Next.js pages and routes
components/       React UI components
lib/              Data fetching, types, utilities
supabase/         SQL migrations, seed data, fixes
.husky/           Git hooks
```

## Related docs

- [SUPABASE_SETUP.md](../SUPABASE_SETUP.md) — Supabase connection
- [supabase/README.md](../supabase/README.md) — SQL migrations reference
- [GITFLOW.md](./GITFLOW.md) — branching strategy & GitHub Actions CI
- [VERSIONING.md](./VERSIONING.md) — semver & release process
