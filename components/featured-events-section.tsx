"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MotionCard } from "@/components/motion-card"
import { MotionSection } from "@/components/motion-section"
import EventGridSkeleton from "@/components/event-grid-skeleton"
import { getFeaturedEvents } from "@/lib/data"
import { getEventThumbnail } from "@/lib/placeholder-images"
import { FALLBACK_FEATURED_EVENTS } from "@/lib/static-content"
import { Event } from "@/lib/types"

export default function FeaturedEventsSection() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFeaturedEvents(4)
      .then((data) => setEvents(data?.length ? data : FALLBACK_FEATURED_EVENTS))
      .catch(() => setEvents(FALLBACK_FEATURED_EVENTS))
      .finally(() => setLoading(false))
  }, [])

  return (
    <MotionSection className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-2">Acara Mendatang</h2>
          <p className="text-muted-foreground">
            Bergabunglah dengan komunitas kami untuk pengalaman yang bermakna
          </p>
        </div>

        {loading ? (
          <div className="mb-8">
            <EventGridSkeleton count={4} variant="event" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {events.map((event, index) => (
              <Link key={event.id} href="/events" className="group block h-full">
                <MotionCard
                  index={index}
                  className="overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl h-full flex flex-col"
                >
                  <div className="relative h-40 w-full overflow-hidden shrink-0">
                    <Image
                      src={getEventThumbnail(event.image_url, event.id)}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
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
                    <Button
                      size="sm"
                      className="w-full rounded-xl bg-white text-primary hover:bg-white/90 font-semibold"
                    >
                      Pelajari Lebih Lanjut
                    </Button>
                  </div>
                </MotionCard>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link href="/events">
            <Button variant="ghost" size="lg" className="text-primary hover:bg-primary/10 font-semibold">
              Lihat Semua Acara →
            </Button>
          </Link>
        </div>
      </div>
    </MotionSection>
  )
}
