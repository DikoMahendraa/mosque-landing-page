-- ============================================================================
-- Migration 03: Finance / transactions
-- ============================================================================
-- Purpose : Stores mosque income and expense records for the keuangan page.
-- Run when: After 02_triggers_and_rls.sql
-- Safe to re-run: Yes
-- Next step : migrations/04_registrations.sql
-- App file  : lib/data.ts → getTransactions() (table name may be finance_transactions in prod)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- transactions
-- type     : 'in' (income) or 'out' (expense)
-- category : Infaq, Zakat, Operasional, etc.
-- amount   : Must be greater than 0
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS transactions (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type        TEXT NOT NULL CHECK (type IN ('in', 'out')),
  category    TEXT NOT NULL,
  amount      NUMERIC(15, 2) NOT NULL CHECK (amount > 0),
  description TEXT,
  date        DATE NOT NULL DEFAULT CURRENT_DATE,
  recorded_by TEXT NOT NULL DEFAULT 'Admin',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS and allow public read + write (keuangan page uses anon key)
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_transactions"  ON transactions;
CREATE POLICY "public_read_transactions"
  ON transactions FOR SELECT USING (true);

DROP POLICY IF EXISTS "public_write_transactions" ON transactions;
CREATE POLICY "public_write_transactions"
  ON transactions FOR ALL USING (true);
