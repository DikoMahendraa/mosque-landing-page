-- ============================================================================
-- Migration 02: Triggers and Row Level Security (core tables)
-- ============================================================================
-- Purpose : Auto-update timestamps + define who can read/write each table.
-- Run when: After 01_core_tables.sql
-- Safe to re-run: Yes (CREATE OR REPLACE + DROP POLICY IF EXISTS)
-- Next step : migrations/03_finance.sql
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Function: update_updated_at_column()
-- Automatically sets updated_at to NOW() whenever a row is updated.
-- Used by  : hero_sections, mosque_stats, events, kajian
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach trigger to each table that has an updated_at column
DROP TRIGGER IF EXISTS trg_hero_sections_updated_at ON hero_sections;
CREATE TRIGGER trg_hero_sections_updated_at
  BEFORE UPDATE ON hero_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_mosque_stats_updated_at ON mosque_stats;
CREATE TRIGGER trg_mosque_stats_updated_at
  BEFORE UPDATE ON mosque_stats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_events_updated_at ON events;
CREATE TRIGGER trg_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS trg_kajian_updated_at ON kajian;
CREATE TRIGGER trg_kajian_updated_at
  BEFORE UPDATE ON kajian
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ----------------------------------------------------------------------------
-- Enable Row Level Security (RLS)
-- RLS must be ON before policies take effect.
-- ----------------------------------------------------------------------------
ALTER TABLE hero_sections    ENABLE ROW LEVEL SECURITY;
ALTER TABLE mosque_stats     ENABLE ROW LEVEL SECURITY;
ALTER TABLE events           ENABLE ROW LEVEL SECURITY;
ALTER TABLE kajian           ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_activities ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- Public read policies (anon + authenticated can SELECT)
-- Allows the website to fetch and display content without login.
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "public_read_hero"       ON hero_sections;
CREATE POLICY "public_read_hero"
  ON hero_sections FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_read_stats"      ON mosque_stats;
CREATE POLICY "public_read_stats"
  ON mosque_stats FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_read_events"     ON events;
CREATE POLICY "public_read_events"
  ON events FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_read_kajian"     ON kajian;
CREATE POLICY "public_read_kajian"
  ON kajian FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_read_activities" ON daily_activities;
CREATE POLICY "public_read_activities"
  ON daily_activities FOR SELECT USING (true);

-- ----------------------------------------------------------------------------
-- Authenticated write policies
-- Only logged-in Supabase users (dashboard admins) can INSERT/UPDATE/DELETE.
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "auth_write_hero"       ON hero_sections;
CREATE POLICY "auth_write_hero"
  ON hero_sections FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "auth_write_stats"      ON mosque_stats;
CREATE POLICY "auth_write_stats"
  ON mosque_stats FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "auth_write_events"     ON events;
CREATE POLICY "auth_write_events"
  ON events FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "auth_write_kajian"     ON kajian;
CREATE POLICY "auth_write_kajian"
  ON kajian FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "auth_write_activities" ON daily_activities;
CREATE POLICY "auth_write_activities"
  ON daily_activities FOR ALL USING (auth.role() = 'authenticated');
