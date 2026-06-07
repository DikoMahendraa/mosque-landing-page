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
    .eq('featured', true)
    .order('date', { ascending: true })
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
    .order('date', { ascending: true })

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
    .eq('active', true)
    .order('created_at', { ascending: true })

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
    .from('transactions')
    .select('*')
    .order('date', { ascending: false })
    .order('created_at', { ascending: false })

  if (type) query = query.eq('type', type)

  const { data, error } = await query
  if (error) { console.error('Error fetching transactions:', error); return [] }
  return data
}

export async function addTransaction(payload: {
  type: 'in' | 'out'
  category: string
  amount: number
  description?: string
  date: string
  recorded_by: string
}) {
  const { data, error } = await supabase.from('transactions').insert([payload]).select().single()
  if (error) throw error
  return data
}

export async function deleteTransaction(id: string) {
  const { error } = await supabase.from('transactions').delete().eq('id', id)
  if (error) throw error
}
