-- ============================================================================
-- Migration 01: Core content tables
-- ============================================================================
-- Purpose : Creates the main tables that power the public website.
-- Run when: Setting up a new Supabase project, or adding missing core tables.
-- Safe to re-run: Yes (uses CREATE TABLE IF NOT EXISTS)
-- Next step : migrations/02_triggers_and_rls.sql
-- ============================================================================

-- ----------------------------------------------------------------------------
-- hero_sections
-- Stores the homepage hero banner (title, subtitle, CTA button).
-- App file  : lib/data.ts → getHomePageData()
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS hero_sections (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  subtitle    TEXT NOT NULL,
  description TEXT NOT NULL,
  image       TEXT NOT NULL DEFAULT '',
  button_text TEXT NOT NULL DEFAULT 'Jelajahi Acara',
  button_link TEXT NOT NULL DEFAULT '/events',
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- mosque_stats
-- Single-row (or few-row) table for homepage statistics counters.
-- App file  : lib/data.ts → getMosqueStats()
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS mosque_stats (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  monthly_events     INTEGER NOT NULL DEFAULT 0,
  community_members  INTEGER NOT NULL DEFAULT 0,
  study_sessions     INTEGER NOT NULL DEFAULT 0,
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- events
-- Mosque events shown on /events and /events/[id].
-- App file  : lib/data.ts → getAllEvents(), getEventById()
-- Note      : Live projects may use event_date / status instead of date / category.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS events (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  description     TEXT,
  date            TEXT NOT NULL,
  time            TEXT NOT NULL,
  location        TEXT NOT NULL DEFAULT 'Aula Utama',
  category        TEXT NOT NULL,
  attendees_count INTEGER NOT NULL DEFAULT 0,
  featured        BOOLEAN NOT NULL DEFAULT FALSE,
  image_url       TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- kajian
-- Islamic study sessions shown on /kajian and /kajian/[id].
-- App file  : lib/data.ts → getAllKajian(), getKajianById()
-- Note      : Live projects may use speaker / status instead of instructor / level.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS kajian (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  instructor  TEXT NOT NULL,
  level       TEXT NOT NULL DEFAULT 'Pemula',
  description TEXT,
  duration    TEXT NOT NULL DEFAULT '4 minggu',
  students    INTEGER NOT NULL DEFAULT 0,
  image_url   TEXT,
  active      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- daily_activities
-- Weekly schedule (prayer times, classes) on the homepage.
-- App file  : lib/data.ts → getDailyActivities()
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS daily_activities (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day        TEXT NOT NULL,
  time       TEXT NOT NULL,
  title      TEXT NOT NULL,
  location   TEXT NOT NULL DEFAULT 'Aula Sholat Utama',
  sort_order INTEGER NOT NULL DEFAULT 0
);
