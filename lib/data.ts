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