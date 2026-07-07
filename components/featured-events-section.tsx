"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Building2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MotionCard } from "@/components/motion-card"
import { MotionSection } from "@/components/motion-section"
import EventGridSkeleton from "@/components/event-grid-skeleton"
import { getFeaturedEvents } from "@/lib/data"
import { getEventThumbnail } from "@/lib/placeholder-images"
import { Event } from "@/lib/types"
import HtmlContent from "@/lib/html-content"

export default function FeaturedEventsSection() {
  const router = useRouter()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getFeaturedEvents(4)
      .then((data) => setEvents(data?.length ? data : []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false))
  }, [])

  if (events.length === 0) return <></>

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
              <MotionCard
                key={event.id}
                index={index}
                className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl h-full flex flex-col cursor-pointer"
                onClick={() => router.push(`/events/${event.id}`)}
              >
                <div className="relative h-40 w-full overflow-hidden shrink-0">
                  <Image
                    src={getEventThumbnail(event.poster, event.id)}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col flex-1 p-6 bg-gradient-to-br from-primary to-accent text-white">
                  <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-lg mb-3 self-start backdrop-blur-sm">
                    {event.status}
                  </span>
                  <h3 className="font-semibold text-lg mb-3 group-hover:text-white/90 transition-colors flex-1">
                    {event.title}
                  </h3>
                  {
                    event.description && (
                      <HtmlContent content={event.description} maxLength={100} detailLink={`/events/${event.id}`} />
                    )
                  }
                  <div className="space-y-2 mb-5 text-sm mt-4">
                    <p className="flex items-center gap-2 text-white">
                      <Calendar className="w-4 h-4" /> {event.event_date}
                    </p>
                    <p className="flex items-center gap-2 font-medium text-white">
                      <Building2 className="w-4 h-4" /> {event.location}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="w-full rounded-xl bg-white text-primary hover:bg-white/90 font-semibold"
                  >
                    Lihat Detail
                  </Button>
                </div>
              </MotionCard>
            ))}
          </div>
        )}

        {
          events.length > 4 && (
            <div className="text-center">
              <Link href="/events">
                <Button variant="ghost" size="lg" className="text-primary hover:bg-primary/10 font-semibold">
                  Lihat Semua Acara →
                </Button>
              </Link>
            </div>
          )
        }
      </div>
    </MotionSection>
  )
}
