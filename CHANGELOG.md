# Changelog

All notable changes to this project are documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).  
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

**Finance System**
- Updated finance page to support new `finance_transactions` table schema with required fields (`title`, `category`, `amount`, `date`, `description`, `type`, `created_by`)
- Added public read access RLS policy for anonymous users to view finance transactions on landing page
- Updated transaction type values from `'in'/'out'` to `'income'/'expense'` for better clarity

**Image Management**
- Implemented dynamic image handling for events using Supabase storage bucket (`event-images`)
- Added storage URL helper function (`getStorageUrl()`) to convert storage paths to full URLs
- Enhanced `getEventThumbnail()` to intelligently handle:
  - Full HTTP/HTTPS URLs (used directly)
  - Storage paths (converted to full Supabase storage URLs)
  - Fallback to placeholder images
- Added event image display on event detail page with original aspect ratio preservation
- Implemented blob URL detection and special handling for temporary browser URLs
- Created storage bucket policies for public read and authenticated upload/delete

**Kajian Features**
- Added Featured Kajian Section on homepage (displays 4 most recent kajian)
- Implemented empty state UI for kajian listing page when no kajian available
- Added kajian image display on detail page with support for multiple URL types (blob, HTTP, storage)
- Translated kajian status from English to Bahasa Indonesia:
  - `upcoming`/`incoming` → "Akan Datang"
  - `ongoing` → "Sedang Berlangsung"
  - `completed`/`finished` → "Selesai"

**Performance Optimization**
- Memoized all homepage sections using `React.memo()` to prevent unnecessary re-renders from hero slider updates
- Added display names to memoized components for better debugging in React DevTools
- Significant performance improvement, especially on mobile devices

### Changed

**Finance Page**
- Updated Transaction type interface to include new fields: `title`, `updated_at`
- Changed `recorded_by` (text) to `created_by` (uuid reference to auth.users)
- Modified UI to display `title` as main heading and `description` as additional info
- Removed "Dicatat oleh" (recorded by) section due to authentication changes

**Image Handling**
- Event detail page now uses `getEventThumbnail()` helper for consistent image URL handling
- Kajian detail page uses direct database URLs without transformation for flexibility
- Fixed Next.js Image component compatibility with blob URLs (uses native `<img>` tag for blob URLs)

**Kajian Pages**
- Updated status display to show Indonesian translations instead of raw API values
- Enhanced status color coding to support both English and Indonesian status values
- Added "Lihat Semua Kajian" button on homepage featured section

**Database Schema**
- Updated `finance_transactions` table with new RLS policies supporting both public and authenticated access
- Added proper permission checks using `can_access_menu()` and `can_access_finance_category()` functions

### Fixed
- Fixed finance data not appearing on landing page due to RLS policy restrictions
- Fixed inconsistent field references in kajian detail page (`poster_image` vs `image_url`)
- Fixed blob URL handling to prevent Supabase storage path prepending
- Fixed meta tags to exclude blob URLs (they don't work for social sharing)
- Removed unused imports and console.log statements
- Fixed ESLint warnings for intentional img tag usage with blob URLs

### Technical Details
- Created `featured-kajian-section.tsx` component following same pattern as featured events
- Added status translation utility functions to both kajian list and featured section
- Implemented conditional rendering for different image URL types (blob vs regular)
- Enhanced placeholder-images.ts with comprehensive URL type detection

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
