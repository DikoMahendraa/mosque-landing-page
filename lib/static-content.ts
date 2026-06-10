import { Event, HeroSection, MosqueStats } from "@/lib/types"

export const STATIC_HERO: HeroSection = {
  id: "static",
  title: "Masjid Darussalam",
  subtitle: "Ruang komunitas yang dinamis",
  description:
    "Ruang komunitas yang dinamis untuk pemuda, pembelajaran, dan pertumbuhan spiritual",
  image: "",
  button_text: "Jelajahi Acara",
  button_link: "/events",
  updated_at: new Date().toISOString(),
}

export const STATIC_YOUTUBE_INTRO = {
  title: "Kenalan dengan Masjid Darussalam",
  description:
    "Tonton video perkenalan singkat untuk mengenal visi masjid, program jamaah, dan bagaimana Anda bisa terlibat dalam komunitas kami.",
  // YouTube video ID from https://www.youtube.com/watch?v=VIDEO_ID
  videoId: "HQzbjtUKjeA",
  channelUrl: "https://youtu.be/HQzbjtUKjeA?si=11FkwvSwpcVhI3XA",
}

export const STATIC_STATS: MosqueStats = {
  id: "static",
  monthly_events: 15,
  community_members: 800,
  study_sessions: 50,
  updated_at: new Date().toISOString(),
}

export const FALLBACK_FEATURED_EVENTS: Event[] = [
  {
    id: "1",
    title: "Kajian Al-Quran",
    event_date: "Jumat, 27 Des",
    time: "19:00",
    location: "Aula Utama",
    status: "Pembelajaran",
    attendees_count: 45,
    featured: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "2",
    title: "Malam Olahraga Pemuda",
    event_date: "Sabtu, 28 Des",
    time: "18:00",
    location: "Lapangan Olahraga",
    status: "Komunitas",
    attendees_count: 32,
    featured: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "3",
    title: "Workshop Keuangan Islam",
    event_date: "Minggu, 29 Des",
    time: "15:00",
    location: "Ruang Konferensi",
    status: "Workshop",
    attendees_count: 28,
    featured: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "4",
    title: "Buka Puasa Bersama",
    event_date: "Rabu, 1 Jan",
    time: "18:30",
    location: "Ruang Makan",
    status: "Sosial",
    attendees_count: 120,
    featured: true,
    created_at: "",
    updated_at: "",
  },
]
