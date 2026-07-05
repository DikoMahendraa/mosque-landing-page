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

export interface MosqueStats {
  id: string
  monthly_events: number
  community_members: number
  study_sessions: number
  updated_at: string
}

export interface Event {
  id: string
  title: string
  description?: string
  event_date: string
  time: string
  poster: string
  location: string
  status: string
  attendees_count: number
  featured: boolean
  created_at: string
  updated_at: string
}

export interface EventRegistration {
  id: string
  event_id: string
  name: string
  address: string
  age: number
  phone?: string
  created_at: string
}

export type EventRegistrationInput = Pick<EventRegistration, 'event_id' | 'name' | 'address' | 'age'> & {
  phone?: string
}

export interface KajianRegistration {
  id: string
  kajian_id: string
  name: string
  address: string
  age: number
  phone?: string
  created_at: string
}

export type KajianRegistrationInput = Pick<KajianRegistration, 'kajian_id' | 'name' | 'address' | 'age'> & {
  phone?: string
}

export interface Kajian {
  id: string
  title: string
  speaker: string
  status: string
  description?: string
  time: string
  location: number
  poster_image: string
  active: boolean
  created_at: string
  updated_at: string
}

export interface DailyActivity {
  id: string
  day: string
  time: string
  title: string
  location: string
  sort_order: number
}

export interface Transaction {
  id: string
  title: string
  category: string
  amount: number
  date: string
  description: string
  type: 'income' | 'expense'
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface MosqueAdmin {
  id: string
  name: string
  position: string
  phone: string
  email: string
  photo: string
  period_start: string
  period_end: string
  created_by?: string | null
  created_at: string
  updated_at: string
}

export interface Post {
  id: string
  title: string
  slug: string
  content: string
  cover_image: string
  author: string
  category: string
  published_date: string
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
}

export const INCOME_CATEGORIES  = ['Infaq', 'Zakat', 'Wakaf', 'Shodaqoh', 'Donasi', 'Lainnya'] as const
export const EXPENSE_CATEGORIES = ['Operasional', 'Pembangunan', 'Konsumsi', 'Gaji/Honor', 'Lainnya'] as const
