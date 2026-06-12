# Supabase SQL — Digital Mosque

All database scripts for this project live in this folder. Run them from **Supabase Dashboard → SQL Editor → New query**.

## Folder structure

```
supabase/
├── README.md                          ← You are here
├── migrations/                        ← Run in order (01 → 04)
│   ├── 01_core_tables.sql             ← Main content tables
│   ├── 02_triggers_and_rls.sql        ← Auto timestamps + access policies
│   ├── 03_finance.sql                 ← Mosque cash flow (transactions)
│   └── 04_registrations.sql           ← Event & kajian signup forms
├── seed/
│   └── 01_sample_data.sql             ← Optional demo data (run once)
└── fixes/
    └── 01_event_registrations_cleanup.sql  ← Repair script if signup broke
```

## Quick start

### New project (empty database)

Run each file **in order**, one at a time:

| Step | File | Purpose |
|------|------|---------|
| 1 | `migrations/01_core_tables.sql` | Creates `hero_sections`, `mosque_stats`, `events`, `kajian`, `daily_activities` |
| 2 | `migrations/02_triggers_and_rls.sql` | Adds `updated_at` triggers and public read / admin write policies |
| 3 | `migrations/03_finance.sql` | Creates `transactions` table for keuangan page |
| 4 | `migrations/04_registrations.sql` | Creates `event_registrations` and `kajian_registrations` |
| 5 | `seed/01_sample_data.sql` | *(Optional)* Inserts sample rows for local demo |

### Existing project (already has tables)

Skip steps that were already applied. If you only need registration forms:

```text
migrations/04_registrations.sql
```

### Something broke during event signup

If you see error `column "attendees_count" does not exist`:

```text
fixes/01_event_registrations_cleanup.sql
```

---

## Table reference

| Table | Used by | Description |
|-------|---------|-------------|
| `hero_sections` | Homepage | Hero banner text, CTA button |
| `mosque_stats` | Homepage | Counter stats (events, members, sessions) |
| `events` | `/events` | Event listings and detail pages |
| `kajian` | `/kajian` | Study session listings and detail pages |
| `daily_activities` | Homepage schedule | Weekly prayer / activity timetable |
| `transactions` | `/keuangan` | Income & expense records |
| `event_registrations` | Event signup popup | Registrants linked to `events.id` |
| `kajian_registrations` | Kajian signup popup | Registrants linked to `kajian.id` |

> **Note:** Your live Supabase project may use slightly different column names (e.g. `event_date` instead of `date`, `finance_transactions` instead of `transactions`). The app reads whatever columns exist in your dashboard — these scripts are the reference schema for fresh setups.

---

## Registration tables

Each registration row stores:

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `event_id` / `kajian_id` | UUID | Foreign key to parent event or kajian |
| `name` | TEXT | Registrant full name |
| `address` | TEXT | Registrant address |
| `age` | INTEGER | Registrant age (1–149) |
| `phone` | TEXT | Optional WhatsApp number |
| `created_at` | TIMESTAMPTZ | When the form was submitted |

**View registrants for one event:**

```sql
SELECT * FROM event_registrations
WHERE event_id = 'your-event-uuid'
ORDER BY created_at DESC;
```

**View registrants for one kajian:**

```sql
SELECT * FROM kajian_registrations
WHERE kajian_id = 'your-kajian-uuid'
ORDER BY created_at DESC;
```

---

## Row Level Security (RLS) summary

| Table group | Public (anon) | Authenticated admin |
|-------------|---------------|---------------------|
| Content tables | SELECT (read) | ALL (read + write) |
| `transactions` | SELECT + ALL | SELECT + ALL |
| Registration tables | SELECT + INSERT | SELECT + INSERT + UPDATE + DELETE |

Public users can **submit** registration forms without logging in. Only authenticated dashboard users can edit or delete registration rows.

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| `relation already exists` | Safe to ignore — scripts use `IF NOT EXISTS` |
| `policy already exists` | Re-run the migration; scripts use `DROP POLICY IF EXISTS` first |
| `column "attendees_count" does not exist` | Run `fixes/01_event_registrations_cleanup.sql` |
| 403 on registration insert | Run `fixes/01_event_registrations_cleanup.sql` or re-run `04_registrations.sql` |
| Duplicate seed data | Only run `seed/01_sample_data.sql` once on a fresh database |

---

## App connection

Set credentials in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

See [SUPABASE_SETUP.md](../SUPABASE_SETUP.md) for the full setup guide.

---

## SQL command reference

Terms used across the migration files:

| Command | What it does |
|---------|--------------|
| `CREATE TABLE IF NOT EXISTS` | Creates a table only if it doesn't already exist — safe to re-run |
| `CREATE INDEX IF NOT EXISTS` | Adds a lookup index (e.g. fast filter by `event_id`) |
| `REFERENCES ... ON DELETE CASCADE` | Foreign key — deleting an event also deletes its registrations |
| `CHECK (...)` | Validates data (e.g. age must be 1–149, amount must be > 0) |
| `CREATE OR REPLACE FUNCTION` | Defines or updates a reusable database function |
| `CREATE TRIGGER` | Runs a function automatically (e.g. set `updated_at` on UPDATE) |
| `DROP TRIGGER IF EXISTS` | Removes an old trigger before recreating it |
| `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` | Turns on RLS so access policies are enforced |
| `CREATE POLICY` | Defines who can SELECT / INSERT / UPDATE / DELETE rows |
| `DROP POLICY IF EXISTS` | Removes an old policy before recreating it — avoids duplicate errors |
| `TO anon, authenticated` | Applies policy to public visitors (`anon`) and logged-in users |
| `WITH CHECK (true)` | Allows the INSERT if the row passes validation |
| `USING (true)` | Allows the SELECT for all rows |
| `GRANT SELECT, INSERT ON ... TO anon` | Gives the public API key permission to read/insert |
| `INSERT INTO ... VALUES` | Adds seed/demo rows (seed folder only) |
