-- ============================================================================
-- Migration 05: Mosque admins (pengurus / struktur organisasi)
-- ============================================================================
-- Purpose : Stores mosque leadership and admin roster for /structure page.
-- Run when: After 04_registrations.sql
-- Safe to re-run: Yes (uses IF NOT EXISTS / DROP POLICY IF EXISTS)
-- App file  : lib/data.ts → getMosqueAdmins()
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.mosque_admins (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  position     TEXT NOT NULL,
  phone        TEXT NOT NULL DEFAULT '',
  email        TEXT NOT NULL DEFAULT '',
  photo        TEXT DEFAULT '',
  period_start DATE NOT NULL,
  period_end   DATE NOT NULL,
  created_by   UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TRIGGER IF EXISTS trg_mosque_admins_updated_at ON public.mosque_admins;
CREATE TRIGGER trg_mosque_admins_updated_at
  BEFORE UPDATE ON public.mosque_admins
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE public.mosque_admins ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read mosque_admins" ON public.mosque_admins;
CREATE POLICY "Public can read mosque_admins"
  ON public.mosque_admins FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert mosque_admins" ON public.mosque_admins;
CREATE POLICY "Authenticated users can insert mosque_admins"
  ON public.mosque_admins FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated users can update mosque_admins" ON public.mosque_admins;
CREATE POLICY "Authenticated users can update mosque_admins"
  ON public.mosque_admins FOR UPDATE
  TO authenticated
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Authenticated users can delete mosque_admins" ON public.mosque_admins;
CREATE POLICY "Authenticated users can delete mosque_admins"
  ON public.mosque_admins FOR DELETE
  TO authenticated
  USING (auth.uid() IS NOT NULL);
