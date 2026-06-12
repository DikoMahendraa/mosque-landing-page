import { supabase } from './supabase'

export async function getHomePageData() {
  const { data, error } = await supabase
    .from('hero_sections')
    .select('*')
    .single()

  if (error) {
    console.error('Error fetching hero section:', error)
    return null
  }
  return data
}

export async function getMosqueStats() {
  const { data, error } = await supabase
    .from('mosque_stats')
    .select('*')
    .single()

  if (error) {
    console.error('Error fetching mosque stats:', error)
    return null
  }
  return data
}

export async function getFeaturedEvents(limit = 4) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .limit(limit)

  if (error) {
    console.error('Error fetching featured events:', error)
    return []
  }
  return data
}

export async function getAllEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')

  if (error) {
    console.error('Error fetching events:', error)
    return []
  }
  return data
}

export async function getEventById(id: string) {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching event:', error)
    return null
  }
  return data
}

export async function registerForEvent(input: {
  event_id: string
  name: string
  address: string
  age: number
  phone?: string
}) {
  const { data, error } = await supabase
    .from('event_registrations')
    .insert({
      event_id: input.event_id,
      name: input.name.trim(),
      address: input.address.trim(),
      age: input.age,
      phone: input.phone?.trim() || null,
    })
    .select()
    .single()

  if (error) {
    console.error('Error registering for event:', error)
    throw error
  }
  return data
}

export async function getEventRegistrations(eventId: string) {
  const { data, error } = await supabase
    .from('event_registrations')
    .select('*')
    .eq('event_id', eventId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching event registrations:', error)
    return []
  }
  return data
}

export async function getEventRegistrationCount(eventId: string) {
  const { count, error } = await supabase
    .from('event_registrations')
    .select('*', { count: 'exact', head: true })
    .eq('event_id', eventId)

  if (error) {
    console.error('Error fetching registration count:', error)
    return 0
  }
  return count ?? 0
}

export async function getAllKajian() {
  const { data, error } = await supabase
    .from('kajian')
    .select('*')

  if (error) {
    console.error('Error fetching kajian:', error)
    return []
  }
  return data
}

export async function getKajianById(id: string) {
  const { data, error } = await supabase
    .from('kajian')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching kajian:', error)
    return null
  }
  return data
}

export async function getDailyActivities() {
  const { data, error } = await supabase
    .from('daily_activities')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Error fetching daily activities:', error)
    return []
  }
  return data
}

// ── TRANSACTIONS ──────────────────────────────────────────
export async function getTransactions(type?: 'in' | 'out') {
  let query = supabase
    .from('finance_transactions')
    .select('*')
    // .order('date', { ascending: false })
    // .order('created_at', { ascending: false })

  if (type) query = query.eq('type', type)

  const { data, error } = await query
  if (error) { console.error('Error fetching transactions:', error); return [] }
  return data
}