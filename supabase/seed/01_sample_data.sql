-- ============================================================================
-- Seed 01: Sample / demo data
-- ============================================================================
-- Purpose : Populates tables with example content for development or demos.
-- Run when: Once, on a fresh database after all migrations.
-- Warning : Re-running will INSERT duplicate rows. Skip if data already exists.
-- ============================================================================

-- Homepage hero banner
INSERT INTO hero_sections (title, subtitle, description, button_text, button_link) VALUES
('Darussalam Mosque',
 'Ruang komunitas yang dinamis',
 'Ruang komunitas yang dinamis untuk pemuda, pembelajaran, dan pertumbuhan spiritual',
 'Jelajahi Acara',
 '/events');

-- Homepage stat counters
INSERT INTO mosque_stats (monthly_events, community_members, study_sessions) VALUES
(15, 800, 50);

-- Sample events
INSERT INTO events (title, description, date, time, location, category, attendees_count, featured) VALUES
('Kajian Al-Quran',        'Sesi pembacaan Al-Quran dan tafsir mingguan untuk semua tingkat.',         'Jumat, 27 Des',  '19:00 - 20:30', 'Aula Utama',        'Pembelajaran', 0, true),
('Malam Olahraga Pemuda',  'Sepak bola, basket, dan bulu tangkis untuk pemuda usia 15-35 tahun.',      'Sabtu, 28 Des',  '18:00 - 20:00', 'Lapangan Olahraga', 'Komunitas',    0, true),
('Workshop Keuangan Islam','Memahami prinsip keuangan Islam dan perbankan syariah.',                    'Minggu, 29 Des', '15:00 - 17:00', 'Ruang Konferensi',  'Workshop',     0, true),
('Buka Puasa Bersama',     'Bergabunglah bersama kami untuk berbuka puasa dan mempererat silaturahmi.','Rabu, 1 Jan',    '18:30 - 20:00', 'Ruang Makan',       'Sosial',       0, true);

-- Sample kajian sessions
INSERT INTO kajian (title, instructor, level, description, duration, students) VALUES
('Dasar-Dasar Bahasa Arab Al-Quran', 'Sheikh Ahmad Al-Rashid', 'Pemula',   'Pelajari dasar-dasar bahasa dan tata bahasa Arab Al-Quran.',                '8 minggu',  0),
('Tafsir Surat Al-Kahf',             'Dr. Fatima Al-Hassan',   'Menengah', 'Menyelami makna dan pelajaran dari Surat Al-Kahf.',                          '10 minggu', 0),
('Etika & Moralitas Islam',          'Ustaz Muhammad Saeed',   'Semua',    'Panduan komprehensif tentang akhlak dan etika Islam dalam kehidupan modern.', '6 minggu',  0),
('Fikih Ibadah Praktis',             'Dr. Aisha Rahman',       'Pemula',   'Panduan praktis tata cara shalat, puasa, zakat, dan ibadah sehari-hari.',     '12 minggu', 0);

-- Weekly activity schedule
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

-- Sample finance transactions
INSERT INTO transactions (type, category, amount, description, date, recorded_by) VALUES
('in',  'Infaq',         2500000,  'Infaq Jumat minggu ke-1',           CURRENT_DATE - 14, 'Admin'),
('in',  'Donasi',        5000000,  'Donasi pembangunan dari Pak Ahmad', CURRENT_DATE - 12, 'Admin'),
('out', 'Operasional',   800000,   'Bayar listrik & air bulan ini',     CURRENT_DATE - 10, 'Admin'),
('in',  'Zakat',         1500000,  'Zakat maal anggota komunitas',      CURRENT_DATE - 8,  'Admin'),
('out', 'Konsumsi',      350000,   'Konsumsi kajian mingguan',          CURRENT_DATE - 7,  'Admin'),
('in',  'Infaq',         3200000,  'Infaq Jumat minggu ke-2',           CURRENT_DATE - 7,  'Admin'),
('out', 'Pembangunan',   4500000,  'Material renovasi serambi masjid',  CURRENT_DATE - 5,  'Admin'),
('in',  'Shodaqoh',      750000,   'Kotak amal harian',                 CURRENT_DATE - 3,  'Admin'),
('out', 'Operasional',   200000,   'Perlengkapan kebersihan',           CURRENT_DATE - 2,  'Admin'),
('in',  'Wakaf',         10000000, 'Wakaf tunai dari Ibu Siti',          CURRENT_DATE - 1,  'Admin');
