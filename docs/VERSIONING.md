# Versioning — Digital Mosque

This app uses **[Semantic Versioning](https://semver.org/)** (SemVer):

```text
MAJOR.MINOR.PATCH   e.g. 1.0.0
  │     │     └── Bug fixes, small tweaks (backward compatible)
  │     └──────── New features (backward compatible)
  └────────────── Breaking changes
```

Current version is defined in **`package.json`** → `"version"` and mirrored in **`CHANGELOG.md`**.

---

## You are here: first release (v1.0.0)

All core features are shipped. The first versioning step is to **declare v1.0.0** and tag it in Git — not to add more code.

### Checklist (do in order)

#### 1. Commit all remaining work on `develop`

Make sure registration, CI, docs, and SQL are committed and pushed:

```bash
git status
git add .
git commit -m "chore: prepare v1.0.0 release"
git push origin develop
```

Wait for **GitHub Actions CI** to pass on `develop`.

#### 2. Create the `main` branch (production)

If `main` does not exist yet:

```bash
git checkout develop
git pull origin develop
git checkout -b main
git push -u origin main
```

In GitHub → **Settings → General → Default branch**, set **`main`** as default (optional but recommended for production).

#### 3. Tag release v1.0.0

On `main` (or `develop` if you tag before merging — prefer tagging **`main`**):

```bash
git checkout main
git pull origin main

# Version is already 1.0.0 in package.json — verify:
grep '"version"' package.json

git tag -a v1.0.0 -m "Release v1.0.0 — first stable release"
git push origin v1.0.0
```

#### 4. Create a GitHub Release

1. Go to **GitHub → Releases → Draft a new release**
2. Choose tag **`v1.0.0`**
3. Title: **`v1.0.0`**
4. Copy the **[1.0.0]** section from [`CHANGELOG.md`](../CHANGELOG.md) into the description
5. Publish release

#### 5. Enable branch protection (recommended)

See [GITFLOW.md](./GITFLOW.md#recommended-github-branch-protection).

---

## Day-to-day versioning (after v1.0.0)

### Patch release (1.0.0 → 1.0.1)

Bug fixes only — no new features.

```bash
git checkout develop
git checkout -b fix/describe-the-bug
# ... fix, PR to develop ...
```

When ready to release:

1. Update `package.json` → `"version": "1.0.1"`
2. Add **`## [1.0.1] - YYYY-MM-DD`** to `CHANGELOG.md` under `[Unreleased]`, move items from Unreleased
3. PR `develop` → `main`, merge
4. Tag and push:

```bash
git checkout main && git pull
git tag -a v1.0.1 -m "Release v1.0.1"
git push origin v1.0.1
```

5. Create GitHub Release from tag

### Minor release (1.0.0 → 1.1.0)

New features, backward compatible.

Same flow as patch, but bump **minor** version and use a `release/1.1.0` branch if you want a stabilization window (see [GITFLOW.md](./GITFLOW.md)).

### Major release (1.x.x → 2.0.0)

Breaking changes (e.g. redesigned URLs, removed APIs, database renames).

Bump **major** version and document breaking changes clearly in CHANGELOG.

---

## Files to update on every release

| File | What to change |
|------|----------------|
| `package.json` | `"version"` field |
| `CHANGELOG.md` | New version section; clear `[Unreleased]` |
| Git tag | `vX.Y.Z` on `main` |
| GitHub Release | Notes from CHANGELOG |

---

## Commit message prefixes (releases)

```text
chore(release): v1.0.0
chore(release): v1.0.1
chore(release): v1.1.0
```

---

## Version in the app (optional, later)

To show version in the UI (e.g. footer), read from `package.json` at build time or add:

```ts
// lib/version.ts
export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? "1.0.0"
```

Set `NEXT_PUBLIC_APP_VERSION` in CI/Vercel from `package.json` if needed. Not required for v1.0.0.

---

## Quick reference

| Question | Answer |
|----------|--------|
| Where is the version? | `package.json` → `version` |
| What changed each release? | `CHANGELOG.md` |
| First release version? | **1.0.0** (features complete) |
| Tag format? | `v1.0.0` (with `v` prefix) |
| Which branch to tag? | **`main`** (production) |

## Related docs

- [GITFLOW.md](./GITFLOW.md) — branches and release workflow
- [DEVELOPMENT.md](./DEVELOPMENT.md) — local setup and CI
