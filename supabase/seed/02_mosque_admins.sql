-- Optional seed data for mosque_admins (run once after 05_mosque_admins.sql)

INSERT INTO public.mosque_admins (name, position, phone, email, photo, period_start, period_end)
VALUES
  (
    'H. Abdullah Mukhtar, S.E.',
    'Ketua DKM',
    '0812-1234-5678',
    'abdullah@darussalam.or.id',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    '2022-01-01',
    '2025-12-31'
  ),
  (
    'Ir. Ahmad Syukri',
    'Wakil Ketua',
    '0813-2345-6789',
    'ahmad.syukri@darussalam.or.id',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    '2022-01-01',
    '2025-12-31'
  ),
  (
    'Muhammad Ridwan, S.Ag.',
    'Sekretaris',
    '0814-3456-7890',
    'ridwan@darussalam.or.id',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200',
    '2022-01-01',
    '2025-12-31'
  );
