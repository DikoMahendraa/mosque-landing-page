/**
 * Prayer Time Announcement Banner
 * 
 * Displays a scrolling/marquee text showing the next prayer time and countdown
 * Positioned at the top of the navigation bar
 * 
 * Features:
 * - Real-time countdown to next prayer
 * - Auto-hides during prayer time window (optional)
 * - Smooth scrolling marquee effect
 * - Responsive design
 */

"use client"

import { useState, useEffect } from "react"
import { Clock, Bell } from "lucide-react"

// Prayer times type definition
type PrayerTimes = {
  Fajr: string
  Sunrise: string
  Dhuhr: string
  Asr: string
  Maghrib: string
  Isha: string
}

// Prayer info configuration
const prayerInfo = [
  { name: "Subuh", key: "Fajr" as keyof PrayerTimes },
  { name: "Dzuhur", key: "Dhuhr" as keyof PrayerTimes },
  { name: "Ashar", key: "Asr" as keyof PrayerTimes },
  { name: "Maghrib", key: "Maghrib" as keyof PrayerTimes },
  { name: "Isya", key: "Isha" as keyof PrayerTimes },
]

export default function PrayerTimeAnnouncement() {
  // State management
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  /**
   * Update current time every second
   * Drives the countdown display
   */
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  /**
   * Fetch prayer times on component mount
   * Uses Aladhan API with Jakarta coordinates
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
   * Returns null if no prayer data or all prayers have passed
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
          totalMinutes: diff,
        }
      }
    }

    // Return tomorrow's Fajr
    return {
      name: "Subuh",
      time: prayerTimes.Fajr,
      hoursLeft: 0,
      minutesLeft: 0,
      totalMinutes: 0,
    }
  }

  const nextPrayer = getNextPrayer()

  // Don't render if no data
  if (!nextPrayer || !prayerTimes) return null

  // Hide if it's prayer time (within 10 minutes of prayer time)
  if (nextPrayer.totalMinutes <= 10) {
    return null
  }

  return (
    <div className="bg-gradient-to-r from-primary via-primary/90 to-primary text-primary-foreground !bg-red-500">
      <div className="animate-marquee whitespace-nowrap py-2 px-4">
        {/* Duplicate content for seamless loop */}
        <span className="inline-flex items-center gap-3 mx-8">
          <Bell className="w-4 h-4 animate-pulse" />
          <span className="font-semibold">
            Sholat {nextPrayer.name} dalam {nextPrayer.hoursLeft} jam {nextPrayer.minutesLeft} menit
          </span>
          <span className="opacity-70">•</span>
          <Clock className="w-4 h-4" />
          <span>Pukul {nextPrayer.time} WIB</span>
        </span>

        {/* Repeat for seamless scrolling */}
        <span className="inline-flex items-center gap-3 mx-8">
          <Bell className="w-4 h-4 animate-pulse" />
          <span className="font-semibold">
            Sholat {nextPrayer.name} dalam {nextPrayer.hoursLeft} jam {nextPrayer.minutesLeft} menit
          </span>
          <span className="opacity-70">•</span>
          <Clock className="w-4 h-4" />
          <span>Pukul {nextPrayer.time} WIB</span>
        </span>

        {/* One more repeat for longer screens */}
        <span className="inline-flex items-center gap-3 mx-8">
          <Bell className="w-4 h-4 animate-pulse" />
          <span className="font-semibold">
            Sholat {nextPrayer.name} dalam {nextPrayer.hoursLeft} jam {nextPrayer.minutesLeft} menit
          </span>
          <span className="opacity-70">•</span>
          <Clock className="w-4 h-4" />
          <span>Pukul {nextPrayer.time} WIB</span>
        </span>
      </div>

      {/* Custom CSS for marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-marquee {
          animation: marquee 20s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
