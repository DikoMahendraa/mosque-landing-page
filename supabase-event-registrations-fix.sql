-- ============================================================
-- FIX: run this if registration fails with attendees_count error
-- Supabase Dashboard → SQL Editor → New Query → Run
-- ============================================================

-- 1. Remove trigger that updates non-existent attendees_count column
DROP TRIGGER IF EXISTS trg_event_registration_attendees ON event_registrations;
DROP FUNCTION IF EXISTS increment_event_attendees();

-- 2. Ensure public (anon) can insert and read registrations
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

GRANT SELECT, INSERT ON event_registrations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON event_registrations TO authenticated;
