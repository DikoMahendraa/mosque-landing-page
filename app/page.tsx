"use client"

import Link from "next/link"
import { Calendar, Users, BookOpen, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { useEffect, useState } from "react"
import { getHomePageData, getFeaturedEvents, getMosqueStats } from "@/lib/data"
import { Event, MosqueStats, HeroSection } from "@/lib/types"

export default function HomePage() {
  const [homeData, setHomeData] = useState<HeroSection | null>(null)
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([])
  const [mosqueStats, setMosqueStats] = useState<MosqueStats | null>(null)
  const [loading, setLoading] = useState(true)

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
    title: 'Al-Nur Mosque',
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
      <section className="relative pt-24 pb-20 md:pt-40 md:pb-32 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-pretty leading-tight">{data.title}</h1>
              <p className="text-xl md:text-2xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
                {data.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Link href="/events" className="w-full sm:w-auto">
                <Button size="lg" className="w-full rounded-xl font-semibold">
                  <Calendar className="w-5 h-5 mr-2" />
                  {data.button_text}
                </Button>
              </Link>
              <Link href="/kajian" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full rounded-xl font-semibold bg-card border-border hover:bg-card/80"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Lihat Kajian
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 px-4 sm:px-6 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-8 text-center bg-background border-0 shadow-sm hover:shadow-md transition-shadow rounded-2xl">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-xl mb-4">
                <Calendar className="w-7 h-7 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">{stats.monthly_events}+</div>
              <p className="text-muted-foreground">Acara Bulanan</p>
            </Card>
            <Card className="p-8 text-center bg-background border-0 shadow-sm hover:shadow-md transition-shadow rounded-2xl">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/10 rounded-xl mb-4">
                <Users className="w-7 h-7 text-accent" />
              </div>
              <div className="text-4xl font-bold text-accent mb-2">{stats.community_members}+</div>
              <p className="text-muted-foreground">Anggota Komunitas</p>
            </Card>
            <Card className="p-8 text-center bg-background border-0 shadow-sm hover:shadow-md transition-shadow rounded-2xl">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-secondary/20 rounded-xl mb-4">
                <BookOpen className="w-7 h-7 text-secondary" />
              </div>
              <div className="text-4xl font-bold text-secondary mb-2">{stats.study_sessions}+</div>
              <p className="text-muted-foreground">Sesi Kajian</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-2">Acara Mendatang</h2>
            <p className="text-muted-foreground">Bergabunglah dengan komunitas kami untuk pengalaman yang bermakna</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {featuredEvents.length > 0 ? featuredEvents.map((event) => (
              <Link key={event.id} href="/events" className="group">
                <Card className="p-6 bg-background border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl h-full">
                  <div className="flex items-start justify-between mb-4">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-lg">
                      {event.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-4 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <div className="space-y-2 mb-6">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> {event.date}
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-4 h-4">⏰</span> {event.time}
                    </p>
                    <p className="text-sm font-medium text-primary flex items-center gap-2">
                      <Users className="w-4 h-4" /> {event.attendees_count} terdaftar
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full rounded-xl border-primary/20 hover:bg-primary/5 text-primary font-medium bg-transparent"
                  >
                    Pelajari Lebih Lanjut
                  </Button>
                </Card>
              </Link>
            )) : (
              // Fallback events when Supabase is not configured
              [
                {
                  id: '1',
                  title: "Kajian Al-Quran",
                  date: "Jumat, 27 Des",
                  time: "19:00",
                  category: "Pembelajaran",
                  attendees_count: 45,
                },
                {
                  id: '2',
                  title: "Malam Olahraga Pemuda",
                  date: "Sabtu, 28 Des",
                  time: "18:00",
                  category: "Komunitas",
                  attendees_count: 32,
                },
                {
                  id: '3',
                  title: "Workshop Keuangan Islam",
                  date: "Minggu, 29 Des",
                  time: "15:00",
                  category: "Workshop",
                  attendees_count: 28,
                },
                {
                  id: '4',
                  title: "Buka Puasa Bersama",
                  date: "Rabu, 1 Jan",
                  time: "18:30",
                  category: "Sosial",
                  attendees_count: 120,
                },
              ].map((event) => (
                <Link key={event.id} href="/events" className="group">
                  <Card className="p-6 bg-background border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl h-full">
                    <div className="flex items-start justify-between mb-4">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-lg">
                        {event.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-4 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <div className="space-y-2 mb-6">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> {event.date}
                      </p>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="w-4 h-4">⏰</span> {event.time}
                      </p>
                      <p className="text-sm font-medium text-primary flex items-center gap-2">
                        <Users className="w-4 h-4" /> {event.attendees_count} terdaftar
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full rounded-xl border-primary/20 hover:bg-primary/5 text-primary font-medium bg-transparent"
                    >
                      Pelajari Lebih Lanjut
                    </Button>
                  </Card>
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
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 px-4 sm:px-6 bg-primary/10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold">Buat Perbedaan</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Dukung inisiatif komunitas kami dan bantu kami menciptakan pengalaman yang bermakna untuk semua orang
          </p>
          <Link href="/donate">
            <Button size="lg" className="rounded-xl font-semibold gap-2">
              <Heart className="w-5 h-5" />
              Donasi Sekarang
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
