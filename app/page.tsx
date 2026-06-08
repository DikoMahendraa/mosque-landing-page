"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MotionCard } from "@/components/motion-card"
import { MotionSection } from "@/components/motion-section"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import SponsorCarousel from "@/components/sponsor-carousel"
import IslamicQuotesCarousel from "@/components/islamic-quotes-carousel"
import HeroTypingContent from "@/components/hero-typing-content"
import CommunityStats from "@/components/community-stats"
import { useEffect, useState } from "react"
import { getHomePageData, getFeaturedEvents, getMosqueStats } from "@/lib/data"
import { getEventThumbnail, PLACEHOLDER_IMAGES } from "@/lib/placeholder-images"
import { Event, MosqueStats, HeroSection } from "@/lib/types"

const HERO_IMAGES = PLACEHOLDER_IMAGES

export default function HomePage() {
  const [homeData, setHomeData] = useState<HeroSection | null>(null)
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([])
  const [mosqueStats, setMosqueStats] = useState<MosqueStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [heroIndex, setHeroIndex] = useState(0)
  const [prevHeroIndex, setPrevHeroIndex] = useState<number | null>(null)
  const [fading, setFading] = useState(false)

  console.log("homeData", homeData)

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setPrevHeroIndex(null)
        setHeroIndex((i) => (i + 1) % HERO_IMAGES.length)
        setFading(false)
      }, 1000)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        const [homePageData, events, stats] = await Promise.all([
          getHomePageData(),
          getFeaturedEvents(4),
          getMosqueStats()
        ])

        setHomeData(homePageData)
        setFeaturedEvents(events)
        setMosqueStats(stats)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    )
  }

  // Fallback data if Supabase is not configured
  const fallbackHomeData: HeroSection = {
    id: 'fallback',
    title: 'Masjid Darussalam',
    subtitle: 'Ruang komunitas yang dinamis',
    description: 'Ruang komunitas yang dinamis untuk pemuda, pembelajaran, dan pertumbuhan spiritual',
    image: '',
    button_text: 'Jelajahi Acara',
    button_link: '/events',
    updated_at: new Date().toISOString()
  }

  const fallbackStats: MosqueStats = {
    id: 'fallback',
    monthly_events: 15,
    community_members: 800,
    study_sessions: 50,
    updated_at: new Date().toISOString()
  }

  const data = homeData || fallbackHomeData
  const stats = mosqueStats || fallbackStats
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Section */}
      <MotionSection variant="hero" className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background images — crossfade */}
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

        {/* Black overlay */}
        <div className="absolute inset-0 bg-black/55 z-10" />

        {/* Dot indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setHeroIndex(i); setFading(false) }}
              className={`rounded-full transition-all duration-300 ${i === heroIndex ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"
                }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 py-32 md:py-48">
          <HeroTypingContent
            title={data.title}
            description={data.description}
            buttonText={data.button_text}
          />
        </div>
      </MotionSection>

      <CommunityStats stats={stats} />

      {/* Sponsor Carousel */}
      <SponsorCarousel />

      {/* Featured Events Section */}
      <MotionSection className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-2">Acara Mendatang</h2>
            <p className="text-muted-foreground">Bergabunglah dengan komunitas kami untuk pengalaman yang bermakna</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {featuredEvents.length > 0 ? featuredEvents.map((event, index) => (
              <Link key={event.id} href="/events" className="group block h-full">
                <MotionCard index={index} className="overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl h-full flex flex-col">
                  <div className="relative h-40 w-full overflow-hidden shrink-0">
                    <Image
                      src={getEventThumbnail(event.image_url, event.id)}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                  {/* Content — gradient */}
                  <div className="flex flex-col flex-1 p-6 bg-gradient-to-br from-primary to-accent text-white">
                    <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-lg mb-3 self-start backdrop-blur-sm">
                      {event.category}
                    </span>
                    <h3 className="font-semibold text-lg mb-3 group-hover:text-white/90 transition-colors flex-1">
                      {event.title}
                    </h3>
                    <div className="space-y-2 mb-5 text-sm text-white/80">
                      <p className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-white/60" /> {event.date}
                      </p>
                      <p className="flex items-center gap-2">
                        <span className="w-4 h-4">⏰</span> {event.time}
                      </p>
                      <p className="flex items-center gap-2 font-medium text-white">
                        <Users className="w-4 h-4" /> {event.attendees_count} terdaftar
                      </p>
                    </div>
                    <Button size="sm" className="w-full rounded-xl bg-white text-primary hover:bg-white/90 font-semibold">
                      Pelajari Lebih Lanjut
                    </Button>
                  </div>
                </MotionCard>
              </Link>
            )) : (
              // Fallback events when Supabase is not configured
              [
                { id: '1', title: "Kajian Al-Quran", date: "Jumat, 27 Des", time: "19:00", category: "Pembelajaran", attendees_count: 45 },
                { id: '2', title: "Malam Olahraga Pemuda", date: "Sabtu, 28 Des", time: "18:00", category: "Komunitas", attendees_count: 32 },
                { id: '3', title: "Workshop Keuangan Islam", date: "Minggu, 29 Des", time: "15:00", category: "Workshop", attendees_count: 28 },
                { id: '4', title: "Buka Puasa Bersama", date: "Rabu, 1 Jan", time: "18:30", category: "Sosial", attendees_count: 120 },
              ].map((event, index) => (
                <Link key={event.id} href="/events" className="group block h-full">
                  <MotionCard index={index} className="overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl h-full flex flex-col">
                    <div className="relative h-40 w-full overflow-hidden shrink-0">
                      <Image
                        src={getEventThumbnail(undefined, event.id)}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    </div>
                    {/* Content — gradient */}
                    <div className="flex flex-col flex-1 p-6 bg-gradient-to-br from-primary to-accent text-white">
                      <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-lg mb-3 self-start backdrop-blur-sm">
                        {event.category}
                      </span>
                      <h3 className="font-semibold text-lg mb-3 group-hover:text-white/90 transition-colors flex-1">
                        {event.title}
                      </h3>
                      <div className="space-y-2 mb-5 text-sm text-white/80">
                        <p className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-white/60" /> {event.date}
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="w-4 h-4">⏰</span> {event.time}
                        </p>
                        <p className="flex items-center gap-2 font-medium text-white">
                          <Users className="w-4 h-4" /> {event.attendees_count} terdaftar
                        </p>
                      </div>
                      <Button size="sm" className="w-full rounded-xl bg-white text-primary hover:bg-white/90 font-semibold">
                        Pelajari Lebih Lanjut
                      </Button>
                    </div>
                  </MotionCard>
                </Link>
              ))
            )}
          </div>

          <div className="text-center">
            <Link href="/events">
              <Button variant="ghost" size="lg" className="text-primary hover:bg-primary/10 font-semibold">
                Lihat Semua Acara →
              </Button>
            </Link>
          </div>
        </div>
      </MotionSection>

      <IslamicQuotesCarousel />

      <Footer />
    </div>
  )
}
