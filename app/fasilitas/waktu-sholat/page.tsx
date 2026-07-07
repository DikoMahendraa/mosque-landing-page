/**
 * Waktu Sholat Page
 * 
 * This page displays daily prayer times with real-time updates.
 * Features:
 * - Real-time clock display (updates every second)
 * - Next prayer countdown
 * - Visual indicators for upcoming prayer
 * - Prayer times fetched from Aladhan API
 */

"use client"

// React hooks for state management and side effects
import { useState, useEffect } from "react"

// Lucide React icons for visual elements
import { Clock, MapPin, Calendar, Sunrise, Sun, Sunset, Moon, CloudMoon } from "lucide-react"

// Custom components for animations and layout
import { MotionCard } from "@/components/motion-card"
import { MotionSection } from "@/components/motion-section"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

/**
 * Type definition for prayer times structure
 * Contains all 5 daily prayers plus sunrise (for Subuh end time)
 */
type PrayerTimes = {
  Fajr: string      // Subuh (dawn prayer)
  Sunrise: string   // Sunrise (end of Subuh time, not a prayer)
  Dhuhr: string     // Dzuhur (noon prayer)
  Asr: string       // Ashar (afternoon prayer)
  Maghrib: string   // Maghrib (sunset prayer)
  Isha: string      // Isya (night prayer)
}

/**
 * Type definition for the complete prayer data response
 * Includes times, date, and location information
 */
type PrayerTimeData = {
  times: PrayerTimes    // Prayer times object
  date: string          // Readable date string
  location: string      // Timezone/location info
}

/**
 * Configuration array for prayer display
 * Maps prayer times to Indonesian names, icons, and gradient colors
 * Note: Sunrise is included for display but marked as "not a prayer time" in logic
 */
const prayerInfo = [
  { name: "Subuh", key: "Fajr" as keyof PrayerTimes, icon: CloudMoon, color: "from-indigo-500 to-purple-500" },
  { name: "Terbit", key: "Sunrise" as keyof PrayerTimes, icon: Sunrise, color: "from-orange-400 to-yellow-400" },
  { name: "Dzuhur", key: "Dhuhr" as keyof PrayerTimes, icon: Sun, color: "from-yellow-500 to-orange-500" },
  { name: "Ashar", key: "Asr" as keyof PrayerTimes, icon: Sun, color: "from-amber-500 to-orange-600" },
  { name: "Maghrib", key: "Maghrib" as keyof PrayerTimes, icon: Sunset, color: "from-orange-600 to-red-500" },
  { name: "Isya", key: "Isha" as keyof PrayerTimes, icon: Moon, color: "from-blue-900 to-indigo-900" },
]

export default function WaktuSholatPage() {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================
  
  /**
   * prayerData: Stores the fetched prayer times data
   * Initial value is null, populated after successful API call
   */
  const [prayerData, setPrayerData] = useState<PrayerTimeData | null>(null)
  
  /**
   * loading: Tracks API request status
   * true = data is being fetched, false = fetch complete (success or error)
   */
  const [loading, setLoading] = useState(true)
  
  /**
   * error: Stores error message if API call fails
   * null = no error, string = error message to display
   */
  const [error, setError] = useState<string | null>(null)
  
  /**
   * currentTime: Real-time clock state
   * Updates every second via setInterval in useEffect
   * Used for: clock display, calculating next prayer, and countdown
   */
  const [currentTime, setCurrentTime] = useState(new Date())

  // ============================================================================
  // SIDE EFFECTS (useEffect hooks)
  // ============================================================================
  
  /**
   * Effect 1: Real-time Clock Updater
   * 
   * Purpose: Updates currentTime state every second for live clock display
   * 
   * How it works:
   * 1. setInterval creates a timer that runs every 1000ms (1 second)
   * 2. On each tick, it updates currentTime with new Date()
   * 3. This triggers a re-render, updating the displayed time
   * 4. Cleanup function clears the interval when component unmounts
   * 
   * Dependencies: [] (empty array)
   * - Runs once on mount
   * - Cleanup runs on unmount
   * 
   * Performance note: This causes a re-render every second, but it's
   * acceptable because the updates are simple (text only)
   */
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    
    // Cleanup function: prevents memory leaks
    // Called when component unmounts or before re-running effect
    return () => clearInterval(timer)
  }, []) // Empty dependency array = run once on mount

  /**
   * Effect 2: Prayer Times Data Fetcher
   * 
   * Purpose: Fetches prayer times from Aladhan API on component mount
   * 
   * How it works:
   * 1. Defines async function to fetch data
   * 2. Constructs API URL with location and date parameters
   * 3. Fetches data and updates state accordingly
   * 4. Handles errors gracefully
   * 
   * Dependencies: [] (empty array)
   * - Runs once on mount
   * - No cleanup needed (fetch is one-time)
   * 
   * API: Aladhan API (https://aladhan.com/prayer-times-api)
   * Method 11: Muslim World League with adjustments for Indonesia
   */
  useEffect(() => {
    async function fetchPrayerTimes() {
      try {
        // ===== API Configuration =====
        // Coordinates for Jakarta (customize based on actual mosque location)
        const latitude = -6.2088   // Jakarta latitude
        const longitude = 106.8456 // Jakarta longitude
        const method = 11          // Calculation method for Indonesia
        
        // Get current date components for API request
        const today = new Date()
        const day = today.getDate()           // Day of month (1-31)
        const month = today.getMonth() + 1    // Month (1-12, +1 because getMonth() is 0-indexed)
        const year = today.getFullYear()      // Year (e.g., 2026)

        // ===== Fetch Prayer Times =====
        // API endpoint format: /timings/DD-MM-YYYY?latitude=X&longitude=Y&method=Z
        const response = await fetch(
          `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${latitude}&longitude=${longitude}&method=${method}`
        )

        // Check if response is successful (status 200-299)
        if (!response.ok) throw new Error("Gagal mengambil data waktu sholat")

        // Parse JSON response
        const data = await response.json()
        
        // ===== Update State with Fetched Data =====
        setPrayerData({
          times: data.data.timings,      // Object with prayer time strings (e.g., "05:30")
          date: data.data.date.readable, // Human-readable date
          location: data.data.meta.timezone, // Timezone info
        })
      } catch (err) {
        // ===== Error Handling =====
        // Store error message for display to user
        setError(err instanceof Error ? err.message : "Terjadi kesalahan")
      } finally {
        // ===== Cleanup =====
        // Always set loading to false, whether success or error
        // This ensures loading spinner is hidden
        setLoading(false)
      }
    }

    // Execute the fetch function
    fetchPrayerTimes()
  }, []) // Empty dependency array = fetch only once on mount

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================
  
  /**
   * getNextPrayer: Calculates which prayer is coming next
   * 
   * Algorithm:
   * 1. Convert current time to minutes since midnight (for easy comparison)
   * 2. Loop through all prayers in chronological order
   * 3. Convert each prayer time to minutes since midnight
   * 4. Find first prayer time that's greater than current time
   * 5. Calculate time difference for countdown
   * 6. If all prayers passed, return tomorrow's Fajr
   * 
   * Returns: Object with prayer name, time, and countdown
   * Returns null if prayer data not loaded yet
   * 
   * Note: This function runs on EVERY render (when currentTime updates)
   * Could be optimized with useMemo if performance becomes an issue
   */
  const getNextPrayer = () => {
    // Guard clause: return early if data not loaded
    if (!prayerData) return null
    
    // Convert current time to minutes since midnight
    // Example: 14:30 = (14 * 60) + 30 = 870 minutes
    const now = currentTime.getHours() * 60 + currentTime.getMinutes()
    
    // Loop through prayers to find next one
    for (const prayer of prayerInfo) {
      // Skip sunrise - it's not a prayer time, just marks end of Subuh
      if (prayer.key === "Sunrise") continue
      
      // Get prayer time string from API data (format: "HH:MM")
      const time = prayerData.times[prayer.key]
      
      // Parse time string to hours and minutes
      // Example: "05:30" -> [5, 30]
      const [hours, minutes] = time.split(":").map(Number)
      
      // Convert prayer time to minutes since midnight
      const prayerMinutes = hours * 60 + minutes
      
      // Check if this prayer is in the future
      if (prayerMinutes > now) {
        // Calculate time difference
        const diff = prayerMinutes - now
        const hoursLeft = Math.floor(diff / 60)  // Integer division for hours
        const minutesLeft = diff % 60            // Remainder for minutes
        
        // Return next prayer info
        return { 
          name: prayer.name,                           // Prayer name (e.g., "Dzuhur")
          time,                                        // Prayer time (e.g., "12:15")
          timeLeft: `${hoursLeft}j ${minutesLeft}m`  // Countdown (e.g., "2j 30m")
        }
      }
    }
    
    // If we're here, all prayers for today have passed
    // Calculate time remaining until tomorrow's Fajr
    const [fajrHours, fajrMinutes] = prayerData.times.Fajr.split(":").map(Number)
    const fajrTomorrowMinutes = fajrHours * 60 + fajrMinutes
    
    // Calculate minutes remaining today (until midnight)
    const minutesUntilMidnight = (24 * 60) - now
    
    // Add minutes from midnight to Fajr
    const totalMinutesUntilFajr = minutesUntilMidnight + fajrTomorrowMinutes
    
    const hoursLeft = Math.floor(totalMinutesUntilFajr / 60)
    const minutesLeft = totalMinutesUntilFajr % 60
    
    // Return tomorrow's Fajr with actual countdown
    return { 
      name: "Subuh",                                    // First prayer of the day
      time: prayerData.times.Fajr,                      // Fajr time
      timeLeft: `${hoursLeft}j ${minutesLeft}m (Besok)` // Countdown with "Tomorrow" label
    }
  }

  /**
   * Calculate next prayer on every render
   * This is called every second when currentTime updates
   * Result is used to:
   * 1. Display next prayer info in header card
   * 2. Highlight the upcoming prayer card with ring effect
   */
  const nextPrayer = getNextPrayer()

  // ============================================================================
  // RENDER / JSX
  // ============================================================================
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Main Navigation Bar */}
      <Navigation />

      {/* ===== HERO SECTION ===== */}
      {/* 
        Header section with page title and description
        - variant="hero": applies entrance animation from motion library
        - Gradient background for visual appeal
        - Responsive padding: px-4 on mobile, px-6 on desktop
      */}
      <MotionSection 
        variant="hero" 
        className="pt-20 pb-10 px-4 sm:px-6 bg-gradient-to-b from-primary/80 to-background"
      >
        <div className="max-w-5xl mx-auto">
          {/* Small label above title */}
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            Fasilitas Digital
          </p>
          
          {/* Main page title - responsive text size */}
          <h1 className="text-3xl md:text-4xl font-bold">Waktu Sholat</h1>
          
          {/* Page description */}
          <p className="text-muted-foreground mt-1 text-sm">
            Jadwal waktu sholat harian untuk wilayah sekitar masjid
          </p>
        </div>
      </MotionSection>

      {/* ===== MAIN CONTENT SECTION ===== */}
      <MotionSection className="px-4 sm:px-6 py-20">
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* 
            ===== CONDITIONAL RENDERING LOGIC =====
            Three possible states:
            1. loading = true → Show loading spinner
            2. error exists → Show error message
            3. prayerData exists → Show prayer times (main content)
          */}
          
          {/* STATE 1: Loading State */}
          {loading ? (
            <MotionCard index={0} className="p-12 rounded-2xl text-center">
              <div className="animate-pulse space-y-3">
                {/* Clock icon with spinning animation */}
                <Clock className="w-12 h-12 mx-auto text-muted-foreground" />
                <p className="text-muted-foreground">Memuat jadwal sholat...</p>
              </div>
            </MotionCard>
          ) : /* STATE 2: Error State */ error ? (
            <MotionCard index={0} className="p-12 rounded-2xl text-center border-destructive/50">
              {/* Error heading */}
              <p className="text-destructive font-semibold mb-2">Gagal Memuat Data</p>
              {/* Error message from state */}
              <p className="text-sm text-muted-foreground">{error}</p>
            </MotionCard>
          ) : /* STATE 3: Success State - Prayer Data Loaded */ prayerData ? (
            <>
              {/* 
                ===== CURRENT TIME & NEXT PRAYER CARD =====
                Main feature card showing:
                1. Real-time clock (updates every second)
                2. Next prayer name and time
                3. Countdown to next prayer
              */}
              <MotionCard 
                index={0} 
                className="p-8 rounded-2xl border-0 shadow-sm bg-gradient-to-br from-primary to-primary/80 text-primary-foreground"
              >
                {/* Flex container: vertical on mobile, horizontal on desktop */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  
                  {/* LEFT SIDE: Current Time Display */}
                  <div className="text-center md:text-left">
                    {/* Label */}
                    <p className="text-sm opacity-80 mb-1">Waktu Saat Ini</p>
                    
                    {/* 
                      LIVE CLOCK
                      - Updates every second via currentTime state
                      - toLocaleTimeString: formats time in Indonesian locale
                      - tabular-nums: ensures consistent width for numbers (prevents jitter)
                      - Responsive text size: 4xl on mobile, 5xl on desktop
                    */}
                    <p className="text-4xl md:text-5xl font-bold tabular-nums">
                      {currentTime.toLocaleTimeString("id-ID", { 
                        hour: "2-digit",    // Force 2-digit hours (e.g., "09" not "9")
                        minute: "2-digit",  // Force 2-digit minutes
                        second: "2-digit"   // Force 2-digit seconds
                      })}
                    </p>
                    
                    {/* 
                      CURRENT DATE
                      - Full date with day name
                      - Icon + text layout
                    */}
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-sm opacity-80">
                      <Calendar className="w-4 h-4" />
                      <span>{currentTime.toLocaleDateString("id-ID", { 
                        weekday: "long",   // Full day name (e.g., "Selasa")
                        day: "numeric",    // Day number (e.g., "7")
                        month: "long",     // Full month name (e.g., "Juli")
                        year: "numeric"    // Year (e.g., "2026")
                      })}</span>
                    </div>
                  </div>

                  {/* RIGHT SIDE: Next Prayer Info */}
                  {/* Only render if nextPrayer was calculated successfully */}
                  {nextPrayer && (
                    <div className="text-center md:text-right">
                      {/* Label */}
                      <p className="text-sm opacity-80 mb-1">Sholat Berikutnya</p>
                      
                      {/* Prayer name (e.g., "Dzuhur") */}
                      <p className="text-3xl font-bold">{nextPrayer.name}</p>
                      
                      {/* Prayer time (e.g., "12:15") */}
                      <p className="text-2xl font-semibold mt-1 tabular-nums">{nextPrayer.time}</p>
                      
                      {/* Countdown (e.g., "2j 30m lagi" or "Besok") */}
                      <p className="text-sm opacity-80 mt-1">{nextPrayer.timeLeft} lagi</p>
                    </div>
                  )}
                </div>
              </MotionCard>

              {/* 
                ===== LOCATION INFO CARD =====
                Shows location and calculation method
                - Stacks vertically on mobile, horizontal on desktop
                - Separator dot hidden on mobile
              */}
              <MotionCard index={1} className="p-4 rounded-xl border-0 shadow-sm bg-muted/50">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-muted-foreground text-center sm:text-left flex-wrap">
                  {/* Location info with icon */}
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>Lokasi: <strong className="text-foreground">Jakarta, Indonesia</strong></span>
                  </div>
                  
                  {/* Separator - only visible on desktop */}
                  <span className="hidden sm:inline mx-2">•</span>
                  
                  {/* Calculation method */}
                  <span>Metode: <strong className="text-foreground">Kementerian Agama RI</strong></span>
                </div>
              </MotionCard>

              {/* 
                ===== PRAYER TIMES GRID =====
                Main content: displays all 6 prayer times in cards
                - Grid: 2 columns on mobile, 3 columns on desktop
                - Each card has entrance animation with staggered delay
                - Upcoming prayer gets visual highlight (ring effect)
              */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* 
                  Map through prayerInfo array to create cards
                  Each iteration creates one prayer card
                */}
                {prayerInfo.map((prayer, index) => {
                  // Get the actual time string for this prayer from API data
                  // TypeScript guard: prayerData is guaranteed to exist here due to parent condition
                  if (!prayerData) return null
                  const time = prayerData.times[prayer.key]
                  
                  // Check if this is the next upcoming prayer
                  // Used to apply visual highlight
                  const isNext = nextPrayer?.name === prayer.name
                  
                  return (
                    <MotionCard
                      key={prayer.key}  // Unique key for React reconciliation
                      index={index + 2} // Animation delay (+ 2 to account for cards above)
                      className={`p-6 rounded-2xl border-0 shadow-sm ${
                        // Conditional className: add ring if this is next prayer
                        isNext 
                          ? "ring-2 ring-primary shadow-lg"  // Highlighted style
                          : ""                                // Normal style
                      }`}
                    >
                      {/* 
                        PRAYER ICON
                        - Gradient background using prayer-specific color
                        - Icon component from prayer config
                      */}
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${prayer.color} flex items-center justify-center mb-4`}
                      >
                        <prayer.icon className="w-6 h-6 text-white" />
                      </div>
                      
                      {/* Prayer name (Indonesian) */}
                      <h3 className="font-bold text-lg mb-1">{prayer.name}</h3>
                      
                      {/* 
                        Prayer time from API
                        - text-primary: theme color for emphasis
                        - tabular-nums: prevents width changes when time updates
                      */}
                      <p className="text-2xl font-bold tabular-nums text-primary">{time}</p>
                      
                      {/* 
                        "NEXT" INDICATOR
                        - Only shown if this prayer is next
                        - animate-pulse: subtle pulsing animation
                      */}
                      {isNext && (
                        <p className="text-xs text-primary font-semibold mt-2 animate-pulse">
                          • Selanjutnya
                        </p>
                      )}
                    </MotionCard>
                  )
                })}
              </div>

              {/* 
                ===== INFO / NOTES CARD =====
                Educational information about prayer times
                - Blue theme for informational content
                - Dark mode support with conditional classes
              */}
              <MotionCard index={8} className="p-6 rounded-2xl border-0 shadow-sm bg-blue-50 dark:bg-blue-950">
                {/* Card heading */}
                <h3 className="font-bold mb-3 text-blue-900 dark:text-blue-300">Catatan</h3>
                
                {/* Bullet list of notes */}
                <div className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
                  {/* Note 1: Sunrise explanation */}
                  <p>• Waktu terbit matahari bukan waktu sholat, melainkan penanda berakhirnya waktu Subuh.</p>
                  
                  {/* Note 2: Calculation method */}
                  <p>• Jadwal ini menggunakan metode perhitungan Kementerian Agama Republik Indonesia.</p>
                  
                  {/* Note 3: Timezone info */}
                  <p>• Waktu ditampilkan dalam WIB (Waktu Indonesia Barat).</p>
                </div>
              </MotionCard>
            </>
          ) : /* Fallback: if somehow none of the conditions are true */ null}
        </div>
      </MotionSection>

      {/* Footer component */}
      <Footer />
    </div>
  )
}
