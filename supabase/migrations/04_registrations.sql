-- ============================================================================
-- Migration 04: Event & kajian registration forms
-- ============================================================================
-- Purpose : Stores signup data from the "Daftar Sekarang" popup on detail pages.
-- Run when: After core tables exist (events + kajian must exist first).
-- Safe to re-run: Yes
-- App files: lib/data.ts → registerForEvent(), registerForKajian()
--            components/event-registration-modal.tsx
-- ============================================================================

-- ============================================================================
-- EVENT REGISTRATIONS
-- One event → many registrants (linked by event_id)
-- ============================================================================

CREATE TABLE IF NOT EXISTS event_registrations (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id   UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  address    TEXT NOT NULL,
  age        INTEGER NOT NULL CHECK (age > 0 AND age < 150),
  phone      TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index speeds up COUNT / SELECT WHERE event_id = ...
CREATE INDEX IF NOT EXISTS idx_event_registrations_event_id
  ON event_registrations(event_id);

-- Remove legacy trigger if it was applied (referenced non-existent attendees_count)
DROP TRIGGER IF EXISTS trg_event_registration_attendees ON event_registrations;
DROP FUNCTION IF EXISTS increment_event_attendees();

ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- anon = public website visitors (no login required to register)
DROP POLICY IF EXISTS "public_insert_event_registrations" ON event_registrations;
CREATE POLICY "public_insert_event_registrations"
  ON event_registrations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "public_read_event_registrations" ON event_registrations;
CREATE POLICY "public_read_event_registrations"
  ON event_registrations FOR SELECT
  TO anon, authenticated
  USING (true);

-- authenticated = dashboard admins can also update/delete rows
DROP POLICY IF EXISTS "auth_manage_event_registrations" ON event_registrations;
CREATE POLICY "auth_manage_event_registrations"
  ON event_registrations FOR ALL
  TO authenticated
  USING (auth.role() = 'authenticated');

-- GRANT ensures the Supabase API roles can execute the policies above
GRANT SELECT, INSERT ON event_registrations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON event_registrations TO authenticated;

-- ============================================================================
-- KAJIAN REGISTRATIONS
-- One kajian → many registrants (linked by kajian_id)
-- ============================================================================

CREATE TABLE IF NOT EXISTS kajian_registrations (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kajian_id  UUID NOT NULL REFERENCES kajian(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  address    TEXT NOT NULL,
  age        INTEGER NOT NULL CHECK (age > 0 AND age < 150),
  phone      TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_kajian_registrations_kajian_id
  ON kajian_registrations(kajian_id);

ALTER TABLE kajian_registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_kajian_registrations" ON kajian_registrations;
CREATE POLICY "public_insert_kajian_registrations"
  ON kajian_registrations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "public_read_kajian_registrations" ON kajian_registrations;
CREATE POLICY "public_read_kajian_registrations"
  ON kajian_registrations FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "auth_manage_kajian_registrations" ON kajian_registrations;
CREATE POLICY "auth_manage_kajian_registrations"
  ON kajian_registrations FOR ALL
  TO authenticated
  USING (auth.role() = 'authenticated');

GRANT SELECT, INSERT ON kajian_registrations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON kajian_registrations TO authenticated;
