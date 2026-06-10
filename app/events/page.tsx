"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MotionCard } from "@/components/motion-card"
import EventGridSkeleton from "@/components/event-grid-skeleton"
import { MotionSection } from "@/components/motion-section"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { getAllEvents } from "@/lib/data"
import { getEventThumbnail } from "@/lib/placeholder-images"
import { Event } from "@/lib/types"
import HtmlContent from "@/lib/html-content"


export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllEvents()
      .then((data) => setEvents(data?.length ? data : []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false))
  }, [])

  if (events.length === 0) return <></>

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Header */}
      <MotionSection variant="hero" className="pt-20 pb-12 px-4 sm:px-6 bg-gradient-to-b from-primary/80 to-background">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Acara Mendatang</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Bergabunglah dengan komunitas kami yang dinamis untuk pengalaman yang memperkaya dan koneksi yang bermakna
          </p>
        </div>
      </MotionSection>

      {/* Events Grid */}
      <MotionSection className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <EventGridSkeleton count={4} variant="event" />
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {events.map((event, index) => (
                <Link key={event.id} href={`/events/${event.id}`} className="group block h-full">
                  <MotionCard index={index} className="overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl h-full flex flex-col">
                    <div className="relative h-44 w-full overflow-hidden shrink-0">
                      <Image
                        src={getEventThumbnail(event.image_url, event.id)}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                    </div>
                    {/* Content — gradient background */}
                    <div className="flex flex-col flex-1 p-6 bg-gradient-to-br from-primary to-accent text-white">
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-lg backdrop-blur-sm">
                          {event.status}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-white/90 transition-colors">
                        {event.title}
                      </h3>
                      {
                        event.description && (
                          <HtmlContent content={event.description} maxLength={100} detailLink={`/events/${event.id}`} />
                        )
                      }
                      <div className="space-y-2.5 mb-6 text-sm">
                        <div className="flex items-center gap-3 text-white/80">
                          <Calendar className="w-4 h-4 flex-shrink-0 text-white/60" />
                          <span>{event.event_date}</span>
                        </div>
                        <div className="flex items-center gap-3 text-white/80">
                          <MapPin className="w-4 h-4 flex-shrink-0 text-white/60" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <Button className="w-full rounded-xl font-semibold gap-2 bg-white text-primary hover:bg-white/90">
                        Lihat Detail
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </MotionCard>
                </Link>
              ))}
            </div>
          )}
        </div>
      </MotionSection>

      <Footer />
    </div>
  )
}
