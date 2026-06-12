# GitFlow — Digital Mosque

This project follows a simplified [GitFlow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) branching model.

## Branches

| Branch | Purpose | Deploys to |
|--------|---------|------------|
| `main` | Production-ready code | Production (Vercel) |
| `develop` | Integration branch for ongoing work | Preview / staging |
| `feature/*` | New features | — |
| `fix/*` | Non-urgent bug fixes | — |
| `release/*` | Release preparation (version bump, changelog) | Preview |
| `hotfix/*` | Urgent production fixes | Production (via `main`) |

### Current state

The remote currently has **`develop`**. Create **`main`** when you are ready for the first production release:

```bash
git checkout develop
git pull origin develop
git checkout -b main
git push -u origin main
```

Set `main` as the default production branch in GitHub → **Settings → Branches**.

---

## Workflow

### 1. New feature

```bash
git checkout develop
git pull origin develop
git checkout -b feature/event-registration

# ... work, commit (pre-commit hook runs ESLint) ...

git push -u origin feature/event-registration
```

Open a **Pull Request → `develop`** on GitHub. CI must pass before merge.

### 2. Bug fix (non-urgent)

Same as feature, but branch from `develop`:

```bash
git checkout -b fix/share-modal-mobile develop
```

PR target: **`develop`**.

### 3. Release to production

When `develop` is stable:

```bash
git checkout develop
git pull origin develop
git checkout -b release/1.0.0

# Bump version in package.json, update CHANGELOG.md
git commit -am "chore(release): prepare v1.0.0"
git push -u origin release/1.0.0
```

1. Open PR **`release/1.0.0` → `develop`** (final fixes)
2. Merge to `develop`
3. Open PR **`develop` → `main`** (or merge `release/1.0.0` → `main`)
4. Tag the release on `main`:

```bash
git checkout main
git pull origin main
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
```

### 4. Hotfix (production emergency)

Branch from `main`, fix, merge back to both `main` and `develop`:

```bash
git checkout main
git pull origin main
git checkout -b hotfix/critical-login-bug

# ... fix, commit ...

git push -u origin hotfix/critical-login-bug
```

1. PR **`hotfix/*` → `main`** — merge and deploy
2. PR **`hotfix/*` → `develop`** — keep develop in sync
3. Tag patch release: `v1.0.1`

---

## Branch naming

| Pattern | Example |
|---------|---------|
| `feature/<short-description>` | `feature/kajian-registration` |
| `fix/<short-description>` | `fix/mobile-navigation` |
| `release/<semver>` | `release/1.0.0` |
| `hotfix/<short-description>` | `hotfix/supabase-rls` |

Use lowercase and hyphens. Keep names short but descriptive.

---

## Commit messages

Use clear, imperative messages:

```text
feat(events): add registration popup with Supabase
fix(kajian): correct registration count on detail page
chore(ci): add GitHub Actions workflow
docs(supabase): reorganize SQL migrations
```

Prefixes (optional but recommended):

| Prefix | Use for |
|--------|---------|
| `feat` | New feature |
| `fix` | Bug fix |
| `chore` | Tooling, deps, config |
| `docs` | Documentation only |
| `refactor` | Code change, no behavior change |
| `style` | Formatting, no logic change |

---

## Pull requests

- Target **`develop`** for features and fixes
- Target **`main`** for releases and hotfixes
- Require **CI passing** (GitHub Actions)
- Use the PR template (auto-filled on new PRs)
- Squash or merge commit — team preference; squash keeps history clean on `develop`

### Recommended GitHub branch protection

Configure in **Settings → Branches → Add rule**:

**For `main`:**
- Require pull request before merging
- Require status check: **Lint, Typecheck & Build**
- Do not allow bypassing

**For `develop`:**
- Require pull request before merging (optional for solo dev)
- Require status check: **Lint, Typecheck & Build**

---

## CI (GitHub Actions)

Workflow file: [`.github/workflows/ci.yml`](../.github/workflows/ci.yml)

Runs on every push / PR to `main` and `develop`:

| Step | Command | Blocks merge |
|------|---------|--------------|
| Lint | `pnpm lint` | Yes |
| Typecheck | `pnpm typecheck` | No *(until existing TS errors are fixed)* |
| Build | `pnpm build` | Yes |

View runs: GitHub → **Actions** tab.

---

## Quick reference

```text
feature/fix ──PR──► develop ──PR──► main ──► production
                         ▲              ▲
                         └── hotfix ────┘ (merge to both)
```

## Related docs

- [DEVELOPMENT.md](./DEVELOPMENT.md) — local setup, Husky hooks
- [SUPABASE_SETUP.md](../SUPABASE_SETUP.md) — database setup
