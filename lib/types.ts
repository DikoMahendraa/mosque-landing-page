export interface Event {
  id: string
  title: string
  description?: string
  date: string
  time: string
  category: string
  attendees_count: number
  image_url?: string
  created_at: string
}

export interface MosqueStats {
  id: string
  monthly_events: number
  community_members: number
  study_sessions: number
  updated_at: string
}

export interface HeroSection {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  button_text: string
  button_link: string
  updated_at: string
}
