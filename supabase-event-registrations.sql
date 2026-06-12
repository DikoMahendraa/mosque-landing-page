-- ============================================================
-- Event Registrations — run in Supabase Dashboard → SQL Editor
-- Links registrants to a specific event via event_id
-- ============================================================

CREATE TABLE IF NOT EXISTS event_registrations (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id   UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  address    TEXT NOT NULL,
  age        INTEGER NOT NULL CHECK (age > 0 AND age < 150),
  phone      TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_event_registrations_event_id
  ON event_registrations(event_id);

-- Remove broken trigger if it was created earlier (events table has no attendees_count)
DROP TRIGGER IF EXISTS trg_event_registration_attendees ON event_registrations;
DROP FUNCTION IF EXISTS increment_event_attendees();

-- Row Level Security — allow anonymous public registration
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

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

DROP POLICY IF EXISTS "auth_manage_event_registrations" ON event_registrations;
CREATE POLICY "auth_manage_event_registrations"
  ON event_registrations FOR ALL
  TO authenticated
  USING (auth.role() = 'authenticated');

-- Grant table access to API roles
GRANT SELECT, INSERT ON event_registrations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON event_registrations TO authenticated;
