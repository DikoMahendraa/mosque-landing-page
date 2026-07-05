"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Clock, User, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MotionCard } from "@/components/motion-card"
import { MotionSection } from "@/components/motion-section"
import EventGridSkeleton from "@/components/event-grid-skeleton"
import { getAllKajian } from "@/lib/data"
import { Kajian } from "@/lib/types"
import HtmlContent from "@/lib/html-content"

function translateStatus(status: string): string {
  const statusMap: Record<string, string> = {
    "upcoming": "Akan Datang",
    "incoming": "Akan Datang",
    "ongoing": "Sedang Berlangsung",
    "completed": "Selesai",
    "finished": "Selesai",
  }
  return statusMap[status.toLowerCase()] || status
}

function getStatusColor(status: string) {
  const normalizedStatus = status.toLowerCase()
  switch (normalizedStatus) {
    case "upcoming":
    case "incoming":
      return "bg-accent/20 text-accent"
    case "ongoing":
      return "bg-secondary/20 text-secondary"
    case "completed":
    case "finished":
      return "bg-primary/20 text-primary"
    default:
      return "bg-muted/20 text-muted-foreground"
  }
}

export default function FeaturedKajianSection() {
  const [kajianList, setKajianList] = useState<Kajian[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllKajian()
      .then((data) => {
        // Limit to 4 items for featured section
        const featured = data?.slice(0, 4) || []
        setKajianList(featured)
      })
      .catch(() => setKajianList([]))
      .finally(() => setLoading(false))
  }, [])

  if (!loading && kajianList.length === 0) return <></>

  return (
    <MotionSection className="py-20 px-4 sm:px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-2">Sesi Kajian</h2>
          <p className="text-muted-foreground">
            Perdalam pengetahuan Islam Anda dengan instruktur ahli dan kajian terstruktur
          </p>
        </div>

        {loading ? (
          <div className="mb-8">
            <EventGridSkeleton count={4} variant="kajian" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {kajianList.map((kajian, index) => (
              <Link key={kajian.id} href={`/kajian/${kajian.id}`} className="group block h-full">
                <MotionCard
                  index={index}
                  className="p-6 bg-background border-0 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl flex flex-col h-full"
                >
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-lg ${getStatusColor(kajian.status)}`}>
                      {translateStatus(kajian.status)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors flex-1">
                    {kajian.title}
                  </h3>
                  {kajian.description && (
                    <HtmlContent content={kajian.description} maxLength={100} detailLink={`/kajian/${kajian.id}`} />
                  )}
                  <div className="space-y-3 mb-6 text-sm border-t border-border pt-4 mt-4">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <User className="w-4 h-4 flex-shrink-0 text-primary" />
                      <span className="font-medium">{kajian.speaker}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Clock className="w-4 h-4 flex-shrink-0 text-primary" />
                      <span>{kajian.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Building2 className="w-4 h-4 flex-shrink-0 text-primary" />
                      <span>{kajian.location}</span>
                    </div>
                  </div>
                  <Button className="w-full rounded-xl font-semibold gap-2 bg-primary hover:bg-primary/90">
                    Lihat Detail
                  </Button>
                </MotionCard>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link href="/kajian">
            <Button variant="ghost" size="lg" className="text-primary hover:bg-primary/10 font-semibold">
              Lihat Semua Kajian →
            </Button>
          </Link>
        </div>
      </div>
    </MotionSection>
  )
}
