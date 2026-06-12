-- ============================================================
-- Kajian Registrations — run in Supabase Dashboard → SQL Editor
-- Links registrants to a specific kajian via kajian_id
-- ============================================================

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

-- Row Level Security — allow anonymous public registration
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
