# Changelog

All notable changes to this project are documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).  
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- *(nothing yet)*

---

## [1.0.0] - 2026-06-12

First stable release — Masjid Darussalam digital mosque website.

### Added

**Public website**
- Homepage with hero, stats, featured events, kajian, daily activities, and sponsors
- Events listing and event detail pages (`/events`, `/events/[id]`)
- Kajian listing and kajian detail pages (`/kajian`, `/kajian/[id]`)
- Mosque finance page (`/keuangan`)
- Organization structure, activity, documentation, and donate pages
- SEO metadata, Open Graph tags, and structured data on detail pages
- Share modal (copy link, WhatsApp, Facebook) on event and kajian pages
- WhatsApp floating button and navigation integration

**Registration (Supabase)**
- Event registration popup — saves registrants to `event_registrations` per `event_id`
- Kajian registration popup — saves registrants to `kajian_registrations` per `kajian_id`
- Live participant count on event and kajian detail sidebars
- Post-registration **Konfirmasi ke Admin** button (WhatsApp with pre-filled details)

**Database**
- Organized Supabase SQL under `supabase/` (migrations, seed, fixes, README)
- Tables: `hero_sections`, `mosque_stats`, `events`, `kajian`, `daily_activities`, `transactions`, `event_registrations`, `kajian_registrations`

**Developer experience**
- Husky pre-commit hook with lint-staged (ESLint on staged files)
- ESLint config (Next.js core-web-vitals + TypeScript)
- GitHub Actions CI (lint + build on push/PR to `main` / `develop`)
- GitFlow branching guide (`docs/GITFLOW.md`)
- Development guide (`docs/DEVELOPMENT.md`)

### Changed
- Replaced WhatsApp-only registration links with in-app Supabase registration forms
- Consolidated scattered SQL files into `supabase/` folder structure

---

[Unreleased]: https://github.com/DikoMahendraa/mosque-landing-page/compare/v1.0.0...develop
[1.0.0]: https://github.com/DikoMahendraa/mosque-landing-page/releases/tag/v1.0.0
