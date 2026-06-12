-- ============================================================================
-- Fix 01: Event registrations cleanup
-- ============================================================================
-- Purpose : Repairs event signup when insert fails or RLS blocks anon users.
-- Run when:
--   • Error: column "attendees_count" does not exist
--   • Error: 403 / permission denied on event_registrations INSERT
--   • Public users cannot submit the registration form
-- Safe to re-run: Yes
-- ============================================================================

-- STEP 1: Remove broken trigger
-- An older script tried to increment events.attendees_count after each signup.
-- Many live databases do not have that column, which caused insert to fail.
DROP TRIGGER IF EXISTS trg_event_registration_attendees ON event_registrations;
DROP FUNCTION IF EXISTS increment_event_attendees();

-- STEP 2: Re-apply RLS policies for public registration
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

-- STEP 3: Grant API role permissions
GRANT SELECT, INSERT ON event_registrations TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON event_registrations TO authenticated;
