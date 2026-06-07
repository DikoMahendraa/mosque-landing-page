-- ============================================================
-- Supabase Database Schema for Digital Mosque Website
-- Run this in Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. HERO SECTIONS
CREATE TABLE IF NOT EXISTS hero_sections (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  subtitle    TEXT NOT NULL,
  description TEXT NOT NULL,
  image       TEXT NOT NULL DEFAULT '',
  button_text TEXT NOT NULL DEFAULT 'Jelajahi Acara',
  button_link TEXT NOT NULL DEFAULT '/events',
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. MOSQUE STATS
CREATE TABLE IF NOT EXISTS mosque_stats (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  monthly_events     INTEGER NOT NULL DEFAULT 0,
  community_members  INTEGER NOT NULL DEFAULT 0,
  study_sessions     INTEGER NOT NULL DEFAULT 0,
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. EVENTS
CREATE TABLE IF NOT EXISTS events (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  description     TEXT,
  date            TEXT NOT NULL,
  time            TEXT NOT NULL,
  location        TEXT NOT NULL DEFAULT 'Aula Utama',
  category        TEXT NOT NULL,
  attendees_count INTEGER NOT NULL DEFAULT 0,
  featured        BOOLEAN NOT NULL DEFAULT FALSE,
  image_url       TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. KAJIAN (Islamic Study Sessions)
CREATE TABLE IF NOT EXISTS kajian (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  instructor  TEXT NOT NULL,
  level       TEXT NOT NULL DEFAULT 'Pemula',
  description TEXT,
  duration    TEXT NOT NULL DEFAULT '4 minggu',
  students    INTEGER NOT NULL DEFAULT 0,
  image_url   TEXT,
  active      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. DAILY ACTIVITIES
CREATE TABLE IF NOT EXISTS daily_activities (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day        TEXT NOT NULL,
  time       TEXT NOT NULL,
  title      TEXT NOT NULL,
  location   TEXT NOT NULL DEFAULT 'Aula Sholat Utama',
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- ============================================================
-- TRIGGERS — auto-update updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER trg_hero_sections_updated_at
  BEFORE UPDATE ON hero_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_mosque_stats_updated_at
  BEFORE UPDATE ON mosque_stats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_kajian_updated_at
  BEFORE UPDATE ON kajian
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE hero_sections    ENABLE ROW LEVEL SECURITY;
ALTER TABLE mosque_stats     ENABLE ROW LEVEL SECURITY;
ALTER TABLE events           ENABLE ROW LEVEL SECURITY;
ALTER TABLE kajian           ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_activities ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "public_read_hero"       ON hero_sections    FOR SELECT USING (true);
CREATE POLICY "public_read_stats"      ON mosque_stats     FOR SELECT USING (true);
CREATE POLICY "public_read_events"     ON events           FOR SELECT USING (true);
CREATE POLICY "public_read_kajian"     ON kajian           FOR SELECT USING (true);
CREATE POLICY "public_read_activities" ON daily_activities FOR SELECT USING (true);

-- Authenticated write
CREATE POLICY "auth_write_hero"       ON hero_sections    FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_write_stats"      ON mosque_stats     FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_write_events"     ON events           FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_write_kajian"     ON kajian           FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "auth_write_activities" ON daily_activities FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA
-- ============================================================

INSERT INTO hero_sections (title, subtitle, description, button_text, button_link) VALUES
('Al-Nur Mosque',
 'Ruang komunitas yang dinamis',
 'Ruang komunitas yang dinamis untuk pemuda, pembelajaran, dan pertumbuhan spiritual',
 'Jelajahi Acara',
 '/events');

INSERT INTO mosque_stats (monthly_events, community_members, study_sessions) VALUES
(15, 800, 50);

INSERT INTO events (title, description, date, time, location, category, attendees_count, featured) VALUES
('Kajian Al-Quran',        'Sesi pembacaan Al-Quran dan tafsir mingguan untuk semua tingkat.',         'Jumat, 27 Des',  '19:00 - 20:30', 'Aula Utama',        'Pembelajaran', 45,  true),
('Malam Olahraga Pemuda',  'Sepak bola, basket, dan bulu tangkis untuk pemuda usia 15-35 tahun.',      'Sabtu, 28 Des',  '18:00 - 20:00', 'Lapangan Olahraga', 'Komunitas',    32,  true),
('Workshop Keuangan Islam','Memahami prinsip keuangan Islam dan perbankan syariah.',                    'Minggu, 29 Des', '15:00 - 17:00', 'Ruang Konferensi',  'Workshop',     28,  true),
('Buka Puasa Bersama',     'Bergabunglah bersama kami untuk berbuka puasa dan mempererat silaturahmi.','Rabu, 1 Jan',    '18:30 - 20:00', 'Ruang Makan',       'Sosial',       120, true);

INSERT INTO kajian (title, instructor, level, description, duration, students) VALUES
('Dasar-Dasar Bahasa Arab Al-Quran', 'Sheikh Ahmad Al-Rashid', 'Pemula',   'Pelajari dasar-dasar bahasa dan tata bahasa Arab Al-Quran.',                '8 minggu',  32),
('Tafsir Surat Al-Kahf',             'Dr. Fatima Al-Hassan',   'Menengah', 'Menyelami makna dan pelajaran dari Surat Al-Kahf.',                          '10 minggu', 28),
('Etika & Moralitas Islam',          'Ustaz Muhammad Saeed',   'Semua',    'Panduan komprehensif tentang akhlak dan etika Islam dalam kehidupan modern.', '6 minggu',  45),
('Fikih Ibadah Praktis',             'Dr. Aisha Rahman',       'Pemula',   'Panduan praktis tata cara shalat, puasa, zakat, dan ibadah sehari-hari.',     '12 minggu', 38);

INSERT INTO daily_activities (day, time, title, location, sort_order) VALUES
('Minggu', '06:00', 'Sholat Subuh',              'Aula Sholat Utama', 1),
('Minggu', '10:00', 'Kelas Al-Quran Pemuda',     'Pusat Pendidikan',  2),
('Minggu', '13:00', 'Sholat Dzuhur',             'Aula Sholat Utama', 3),
('Minggu', '16:00', 'Kerja Suka Rela Komunitas', 'Pusat Komunitas',   4),
('Minggu', '18:00', 'Sholat Ashar',              'Aula Sholat Utama', 5),
('Minggu', '19:30', 'Sholat Maghrib & Isya',     'Aula Sholat Utama', 6),
('Senin',  '06:00', 'Sholat Subuh',              'Aula Sholat Utama', 1),
('Senin',  '12:00', 'Sholat Dzuhur',             'Aula Sholat Utama', 2),
('Senin',  '15:00', 'Kelas Studi Islam',         'Pusat Pendidikan',  3),
('Senin',  '18:00', 'Sholat Ashar',              'Aula Sholat Utama', 4),
('Senin',  '19:30', 'Sholat Maghrib & Isya',     'Aula Sholat Utama', 5),
('Selasa', '06:00', 'Sholat Subuh',              'Aula Sholat Utama', 1),
('Selasa', '12:00', 'Sholat Dzuhur',             'Aula Sholat Utama', 2),
('Selasa', '18:00', 'Sholat Ashar',              'Aula Sholat Utama', 3),
('Selasa', '19:30', 'Sholat Maghrib & Isya',     'Aula Sholat Utama', 4),
('Jumat',  '06:00', 'Sholat Subuh',              'Aula Sholat Utama', 1),
('Jumat',  '12:00', 'Sholat Jumat',              'Aula Sholat Utama', 2),
('Jumat',  '19:00', 'Kajian Mingguan',           'Aula Utama',        3),
('Jumat',  '19:30', 'Sholat Maghrib & Isya',     'Aula Sholat Utama', 4);
