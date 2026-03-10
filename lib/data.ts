import { supabase } from './supabase'

// Simple data fetching functions - just consume existing data
export async function getHomePageData() {
  const { data, error } = await supabase
    .from('hero_sections')
    .select('*')
    .single()

  if (error) {
    console.error('Error fetching home page data:', error)
    return null
  }

  return data
}

export async function getFeaturedEvents(limit: number = 4) {
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

export async function getAllEvents() {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .order('date', { ascending: true })

  if (error) {
    console.error('Error fetching all events:', error)
    return []
  }

  return data
}
