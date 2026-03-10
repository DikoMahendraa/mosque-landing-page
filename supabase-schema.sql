-- Supabase Database Schema for Digital Mosque Website
-- Run this SQL in your Supabase SQL Editor

-- Create home_page table

create table public.hero_sections (
  id uuid not null default gen_random_uuid (),
  title text not null,
  subtitle text not null,
  description text not null,
  image text not null,
  button_text text not null,
  button_link text not null,
  updated_at timestamp with time zone not null default now(),
  constraint hero_sections_pkey primary key (id)
) TABLESPACE pg_default;


create table public.hero_sections (
  id uuid not null default gen_random_uuid (),
  title text not null,
  subtitle text not null,
  description text not null,
  image text not null,
  button_text text not null,
  button_link text not null,
  updated_at timestamp with time zone not null default now(),
  constraint hero_sections_pkey primary key (id)
) TABLESPACE pg_default;

-- Create mosque_stats table
CREATE TABLE mosque_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  monthly_events INTEGER NOT NULL DEFAULT 0,
  community_members INTEGER NOT NULL DEFAULT 0,
  study_sessions INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  category TEXT NOT NULL,
  attendees_count INTEGER NOT NULL DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial data for hero_section
INSERT INTO hero_section (
  mosque_name,
  tagline,
  hero_title,
  hero_description,
  cta_main_text,
  cta_secondary_text,
  featured_title,
  featured_description,
  donation_title,
  donation_description
) VALUES (
  'Al-Nur Mosque',
  'Ruang komunitas yang dinamis untuk pemuda, pembelajaran, dan pertumbuhan spiritual',
  'Al-Nur Mosque',
  'Ruang komunitas yang dinamis untuk pemuda, pembelajaran, dan pertumbuhan spiritual',
  'Jelajahi Acara',
  'Lihat Kajian',
  'Acara Mendatang',
  'Bergabunglah dengan komunitas kami untuk pengalaman yang bermakna',
  'Buat Perbedaan',
  'Dukung inisiatif komunitas kami dan bantu kami menciptakan pengalaman yang bermakna untuk semua orang'
);

-- Insert initial data for mosque_stats
INSERT INTO mosque_stats (
  monthly_events,
  community_members,
  study_sessions
) VALUES (
  15,
  800,
  50
);

-- Insert sample events
INSERT INTO events (
  title,
  date,
  time,
  category,
  attendees_count,
  featured
) VALUES 
  ('Kajian Al-Quran', 'Jumat, 27 Des', '19:00', 'Pembelajaran', 45, true),
  ('Malam Olahraga Pemuda', 'Sabtu, 28 Des', '18:00', 'Komunitas', 32, true),
  ('Workshop Keuangan Islam', 'Minggu, 29 Des', '15:00', 'Workshop', 28, true),
  ('Buka Puasa Bersama', 'Rabu, 1 Jan', '18:30', 'Sosial', 120, true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_hero_section_updated_at BEFORE UPDATE ON hero_section FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mosque_stats_updated_at BEFORE UPDATE ON mosque_stats FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE hero_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE mosque_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to hero_section" ON hero_section FOR SELECT USING (true);
CREATE POLICY "Allow public read access to mosque_stats" ON mosque_stats FOR SELECT USING (true);
CREATE POLICY "Allow public read access to events" ON events FOR SELECT USING (true);

-- Create policies for authenticated users to update data
CREATE POLICY "Allow authenticated users to update hero_section" ON hero_section FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update mosque_stats" ON mosque_stats FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update events" ON events FOR ALL USING (auth.role() = 'authenticated');
