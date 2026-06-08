"use client"

import { useEffect, useRef } from "react"
import { MotionSection } from "@/components/motion-section"

const SPONSORS = [
  { name: "Bank Syariah Indonesia", abbr: "BSI", color: "#1B4F8A" },
  { name: "Baznas", abbr: "BAZNAS", color: "#2E7D32" },
  { name: "Dompet Dhuafa", abbr: "DD", color: "#E65100" },
  { name: "Rumah Zakat", abbr: "RZ", color: "#6A1B9A" },
  { name: "Tokopedia", abbr: "TOPED", color: "#00AA5B" },
  { name: "BRI Syariah", abbr: "BRIS", color: "#003087" },
  { name: "Lazismu", abbr: "LAZISMU", color: "#C62828" },
  { name: "Muamalat", abbr: "MUAMALAT", color: "#1565C0" },
]

// Duplicate for seamless infinite loop
const ALL = [...SPONSORS, ...SPONSORS]

export default function SponsorCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let animationId: number
    let position = 0
    const speed = 0.6 // px per frame

    // Total width of one set (half the track)
    const singleSetWidth = track.scrollWidth / 2

    function animate() {
      position += speed
      if (position >= singleSetWidth) {
        position = 0
      }
      track.style.transform = `translateX(-${position}px)`
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    const handleMouseEnter = () => cancelAnimationFrame(animationId)
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate)
    }

    track.parentElement?.addEventListener("mouseenter", handleMouseEnter)
    track.parentElement?.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      track.parentElement?.removeEventListener("mouseenter", handleMouseEnter)
      track.parentElement?.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <MotionSection className="py-16 px-0 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">Didukung Oleh</p>
        <h2 className="text-2xl font-bold">Sponsor & Komunitas Kami</h2>
      </div>

      {/* Fade edges */}
      <div className="relative">
        <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none bg-linear-to-r from-background to-transparent" />
        <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none bg-linear-to-l from-background to-transparent" />

        {/* Track */}
        <div className="overflow-hidden cursor-pointer py-4">
          <div ref={trackRef} className="flex gap-6 w-max">
            {ALL.map((sponsor, i) => (
              <div
                key={i}
                className="shrink-0 w-64 h-32 rounded-2xl bg-background shadow-md flex flex-col items-center justify-center gap-1 hover:shadow-md hover:border-primary/30 transition-all duration-300 px-4"
              >
                {/* Logo placeholder — replace with <Image> once you have real logos */}
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: sponsor.color }}
                >
                  {sponsor.abbr.slice(0, 2)}
                </div>
                <span className="text-lg font-semibold text-center text-foreground leading-tight">
                  {sponsor.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MotionSection>
  )
}
