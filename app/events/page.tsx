"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { getAllEvents } from "@/lib/data"
import { Event } from "@/lib/types"

const FALLBACK_EVENTS: Event[] = [
  {
    id: "1",
    title: "Kajian Al-Quran",
    date: "Jumat, 27 Des",
    time: "19:00 - 20:30",
    location: "Aula Utama",
    attendees_count: 45,
    description: "Sesi pembacaan Al-Quran dan tafsir mingguan untuk semua tingkat.",
    category: "Pembelajaran",
    featured: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "2",
    title: "Malam Olahraga Pemuda",
    date: "Sabtu, 28 Des",
    time: "18:00 - 20:00",
    location: "Lapangan Olahraga",
    attendees_count: 32,
    description: "Sepak bola, basket, dan bulu tangkis untuk pemuda usia 15-35 tahun.",
    category: "Komunitas",
    featured: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "3",
    title: "Workshop Keuangan Islam",
    date: "Minggu, 29 Des",
    time: "15:00 - 17:00",
    location: "Ruang Konferensi",
    attendees_count: 28,
    description: "Memahami prinsip keuangan Islam dan perbankan syariah.",
    category: "Workshop",
    featured: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "4",
    title: "Buka Puasa Bersama",
    date: "Rabu, 1 Jan",
    time: "18:30 - 20:00",
    location: "Ruang Makan",
    attendees_count: 120,
    description: "Bergabunglah bersama kami untuk berbuka puasa dan mempererat silaturahmi.",
    category: "Sosial",
    featured: true,
    created_at: "",
    updated_at: "",
  },
]

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllEvents()
      .then((data) => setEvents(data?.length ? data : FALLBACK_EVENTS))
      .catch(() => setEvents(FALLBACK_EVENTS))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Header */}
      <section className="pt-20 pb-12 px-4 sm:px-6 bg-gradient-to-b from-secondary/20 to-background">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Acara Mendatang</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Bergabunglah dengan komunitas kami yang dinamis untuk pengalaman yang memperkaya dan koneksi yang bermakna
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="rounded-2xl overflow-hidden animate-pulse">
                  <div className="h-44 bg-muted" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-muted rounded w-1/4" />
                    <div className="h-6 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="space-y-2 pt-2">
                      {[...Array(4)].map((_, j) => (
                        <div key={j} className="h-4 bg-muted rounded w-1/2" />
                      ))}
                    </div>
                    <div className="h-10 bg-muted rounded-xl pt-2" />
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {events.map((event) => (
                <Link key={event.id} href={`/events/${event.id}`} className="group">
                  <Card className="overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl h-full flex flex-col">
                    {/* Thumbnail */}
                    {event.image_url ? (
                      <div className="relative h-44 w-full overflow-hidden flex-shrink-0">
                        <Image
                          src={event.image_url}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="h-44 w-full bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-14 h-14 text-primary/30" />
                      </div>
                    )}
                    {/* Content — gradient background */}
                    <div className="flex flex-col flex-1 p-6 bg-gradient-to-br from-primary to-accent text-white">
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-lg backdrop-blur-sm">
                          {event.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-white/90 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-sm text-white/80 mb-6 flex-1">{event.description}</p>
                      <div className="space-y-2.5 mb-6 text-sm">
                        <div className="flex items-center gap-3 text-white/80">
                          <Calendar className="w-4 h-4 flex-shrink-0 text-white/60" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/80">
                          <span className="w-4 h-4 flex-shrink-0">⏰</span>
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/80">
                          <MapPin className="w-4 h-4 flex-shrink-0 text-white/60" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-3 font-medium text-white">
                          <Users className="w-4 h-4 flex-shrink-0" />
                          <span>{event.attendees_count} terdaftar</span>
                        </div>
                      </div>
                      <Button className="w-full rounded-xl font-semibold gap-2 bg-white text-primary hover:bg-white/90">
                        Lihat Detail
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
