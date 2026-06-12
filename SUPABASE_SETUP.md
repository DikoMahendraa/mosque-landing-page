# Supabase Integration Guide — Digital Mosque

## Step 1 · Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in (or create a free account).
2. Click **New project**.
3. Fill in: project name, database password (save this!), and choose a region closest to your users.
4. Click **Create new project** and wait ~2 minutes for provisioning.

---

## Step 2 · Run the Schema

All SQL scripts are organized under the [`supabase/`](./supabase/) folder. See [`supabase/README.md`](./supabase/README.md) for full documentation.

**New project** — run each file in order in the SQL Editor:

| Order | File |
|-------|------|
| 1 | `supabase/migrations/01_core_tables.sql` |
| 2 | `supabase/migrations/02_triggers_and_rls.sql` |
| 3 | `supabase/migrations/03_finance.sql` |
| 4 | `supabase/migrations/04_registrations.sql` |
| 5 | `supabase/seed/01_sample_data.sql` *(optional)* |

1. In your Supabase dashboard, click **SQL Editor** in the left sidebar.
2. Click **New query**.
3. Open the first migration file, paste into the editor, and click **Run** (`Cmd+Enter`).
4. Repeat for each file in the table above.

This creates all tables, triggers, RLS policies, registration forms, and optional seed data.

---

## Step 3 · Get Your API Keys

1. In the Supabase dashboard, go to **Settings** → **API**.
2. Copy:
   - **Project URL** — looks like `https://abcdefgh.supabase.co`
   - **anon / public** key — the long JWT string under "Project API keys"

---

## Step 4 · Configure Environment Variables

In your project root, copy the example file and fill it in:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

> **Never commit `.env.local` to git.** It is already in `.gitignore` by default in Next.js projects.

---

## Step 5 · Run the App

```bash
pnpm dev
```

The app now fetches live data from Supabase. If the connection fails, each page falls back to hardcoded data so the site stays functional.

---

## Managing Data via Supabase Dashboard

### Table Editor (easiest)

1. Click **Table Editor** in the left sidebar.
2. Select a table (e.g., `events`).
3. Click **Insert row** to add new data, or click any cell to edit inline.
4. Changes are live immediately — refresh the site to see them.

### SQL Editor (for bulk changes)

```sql
-- Add a new event
INSERT INTO events (title, description, date, time, location, category, attendees_count, featured)
VALUES ('Pengajian Ramadan', 'Kajian khusus bulan Ramadan', 'Senin, 10 Mar', '20:00 - 21:30', 'Aula Utama', 'Pembelajaran', 0, true);

-- Update mosque stats
UPDATE mosque_stats SET community_members = 850;

-- Hide a kajian without deleting it
UPDATE kajian SET active = false WHERE id = 'your-kajian-uuid';
```

### Adding Images

The `events` and `kajian` tables have an `image_url` column:

1. Go to **Storage** in the Supabase dashboard.
2. Create a bucket called `mosque-images`, set it to **Public**.
3. Upload images and copy the public URL.
4. Paste the URL into the `image_url` column of the relevant row.

---

## Table Reference

| Table | Purpose | Key columns |
|---|---|---|
| `hero_sections` | Homepage hero banner | title, subtitle, description, button_text, button_link |
| `mosque_stats` | Homepage stats counter | monthly_events, community_members, study_sessions |
| `events` | All mosque events | title, date, time, location, category, featured, attendees_count |
| `kajian` | Islamic study sessions | title, instructor, level, duration, students, active |
| `daily_activities` | Weekly prayer/activity schedule | day, time, title, location, sort_order |
| `event_registrations` | Event signup form data | event_id, name, address, age, phone |
| `kajian_registrations` | Kajian signup form data | kajian_id, name, address, age, phone |
| `transactions` | Mosque finance records | type, category, amount, date |

---

## Troubleshooting

**Data not showing?**
- Check `.env.local` values are correct (no trailing spaces, correct URL format).
- Restart `pnpm dev` after editing `.env.local`.
- Open the browser console and look for `Error fetching...` messages.

**RLS blocking queries?**
- The schema already creates `SELECT` policies for the anon (public) role.
- If you still get 403 errors, go to **Authentication** → **Policies** in the dashboard and verify the `public_read_*` policies exist on each table.

**Schema errors when running SQL?**
- "relation already exists" — the table already exists, safe to ignore (`CREATE TABLE IF NOT EXISTS` is used).
- Duplicate policy errors — drop them first: `DROP POLICY IF EXISTS "policy_name" ON table_name;`
- Event registration fails with `attendees_count` — run `supabase/fixes/01_event_registrations_cleanup.sql`

For detailed SQL documentation, see [`supabase/README.md`](./supabase/README.md).
