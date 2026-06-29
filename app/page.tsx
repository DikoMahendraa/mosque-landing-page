"use client"

import { useEffect, useState } from "react"
import { MotionSection } from "@/components/motion-section"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import SponsorCarousel from "@/components/sponsor-carousel"
import IslamicQuotesCarousel from "@/components/islamic-quotes-carousel"
import HeroTypingContent from "@/components/hero-typing-content"
import CommunityStats from "@/components/community-stats"
import FeaturedEventsSection from "@/components/featured-events-section"
import BeritaSection from "@/components/berita-section"
import YoutubeIntroSection from "@/components/youtube-intro-section"
import { PLACEHOLDER_IMAGES } from "@/lib/placeholder-images"
import { STATIC_HERO, STATIC_STATS } from "@/lib/static-content"

const HERO_IMAGES = PLACEHOLDER_IMAGES

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setHeroIndex((i) => (i + 1) % HERO_IMAGES.length)
        setFading(false)
      }, 1000)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <MotionSection variant="hero" className="relative min-h-[90vh] flex items-center overflow-hidden">
        {HERO_IMAGES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
            style={{
              backgroundImage: `url(${src})`,
              opacity: i === heroIndex ? (fading ? 0 : 1) : 0,
              zIndex: i === heroIndex ? 1 : 0,
            }}
          />
        ))}

        <div className="absolute inset-0 bg-black/55 z-10" />

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setHeroIndex(i)
                setFading(false)
              }}
              className={`rounded-full transition-all duration-300 ${
                i === heroIndex ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 py-32 md:py-48">
          <HeroTypingContent
            title={STATIC_HERO.title}
            description={STATIC_HERO.description}
            buttonText={STATIC_HERO.button_text}
          />
        </div>
      </MotionSection>

      <CommunityStats stats={STATIC_STATS} />

      <YoutubeIntroSection />

      <SponsorCarousel />

      <FeaturedEventsSection />

      <BeritaSection />

      <IslamicQuotesCarousel />

      <Footer />
    </div>
  )
}
