/**
 * Floating Prayer Time Widget
 * 
 * A fixed-position widget at bottom-right showing next prayer time
 * Expands on hover to show detailed information
 * 
 * Features:
 * - Always visible floating button
 * - Shows next prayer countdown
 * - Expands on hover (desktop) with slide animation
 * - Responsive design
 */

"use client"

import { useState, useEffect } from "react"
import { Clock, Bell } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

// Prayer times type definition
type PrayerTimes = {
  Fajr: string
  Sunrise: string
  Dhuhr: string
  Asr: string
  Maghrib: string
  Isha: string
}

// Prayer info configuration with icons
const prayerInfo = [
  { name: "Subuh", key: "Fajr" as keyof PrayerTimes },
  { name: "Dzuhur", key: "Dhuhr" as keyof PrayerTimes },
  { name: "Ashar", key: "Asr" as keyof PrayerTimes },
  { name: "Maghrib", key: "Maghrib" as keyof PrayerTimes },
  { name: "Isya", key: "Isha" as keyof PrayerTimes },
]

export default function FloatingPrayerTime() {
  // State management
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  /**
   * Check if device is mobile
   */
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  /**
   * Update current time every second
   */
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  /**
   * Fetch prayer times on component mount
   */
  useEffect(() => {
    async function fetchPrayerTimes() {
      try {
        const latitude = -6.2088
        const longitude = 106.8456
        const method = 11

        const today = new Date()
        const day = today.getDate()
        const month = today.getMonth() + 1
        const year = today.getFullYear()

        const response = await fetch(
          `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${latitude}&longitude=${longitude}&method=${method}`
        )

        if (response.ok) {
          const data = await response.json()
          setPrayerTimes(data.data.timings)
        }
      } catch (err) {
        console.error("Failed to fetch prayer times:", err)
      }
    }

    fetchPrayerTimes()
  }, [])

  /**
   * Calculate next prayer and remaining time
   */
  const getNextPrayer = () => {
    if (!prayerTimes) return null

    const now = currentTime.getHours() * 60 + currentTime.getMinutes()

    for (const prayer of prayerInfo) {
      const time = prayerTimes[prayer.key]
      const [hours, minutes] = time.split(":").map(Number)
      const prayerMinutes = hours * 60 + minutes

      if (prayerMinutes > now) {
        const diff = prayerMinutes - now
        const hoursLeft = Math.floor(diff / 60)
        const minutesLeft = diff % 60

        return {
          name: prayer.name,
          time,
          hoursLeft,
          minutesLeft,
        }
      }
    }

    // All prayers have passed for today - calculate time until tomorrow's Fajr
    const [fajrHours, fajrMinutes] = prayerTimes.Fajr.split(":").map(Number)
    const fajrTomorrowMinutes = fajrHours * 60 + fajrMinutes

    // Calculate minutes remaining today (until midnight)
    const minutesUntilMidnight = (24 * 60) - now

    // Add minutes from midnight to Fajr
    const totalMinutesUntilFajr = minutesUntilMidnight + fajrTomorrowMinutes

    const hoursLeft = Math.floor(totalMinutesUntilFajr / 60)
    const minutesLeft = totalMinutesUntilFajr % 60

    return {
      name: "Subuh",
      time: prayerTimes.Fajr,
      hoursLeft,
      minutesLeft,
    }
  }

  const nextPrayer = getNextPrayer()

  // Don't render if no data
  if (!nextPrayer || !prayerTimes) return null

  return (
    <div
      className="fixed z-50 bottom-20 right-4 md:bottom-4 md:right-4"
      onMouseEnter={() => !isMobile && setIsExpanded(true)}
      onMouseLeave={() => !isMobile && setIsExpanded(false)}
      onClick={() => isMobile && setIsExpanded(!isExpanded)}
    >
      <div className="flex items-center gap-0">
        {/* Expanded Panel - Shows only next prayer info */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ width: 0, opacity: 0, x: 20 }}
              animate={{ width: "auto", opacity: 1, x: 0 }}
              exit={{ width: 0, opacity: 0, x: 20 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden mr-2"
            >
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-border/50 px-4 py-3 whitespace-nowrap">
                {/* Next Prayer Info */}
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Sholat Berikutnya</p>
                    <p className="font-bold text-lg">{nextPrayer.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary tabular-nums">{nextPrayer.time}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" />
                      {nextPrayer.hoursLeft}j {nextPrayer.minutesLeft}m lagi
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bell Icon Button - Always Visible */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-full shadow-2xl p-4 hover:shadow-primary/50 transition-all relative group"
          aria-label="Waktu Sholat"
        >
          {/* Pulse Animation Ring */}
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />

          {/* Bell Icon */}
          <Bell className="w-6 h-6 relative z-10 animate-pulse" />

          {/* Badge showing countdown (small) */}
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
            {nextPrayer.hoursLeft}j
          </div>
        </motion.button>
      </div>
    </div>
  )
}
