"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Head from "next/head"
import { Clock, User, Award, ArrowRight, Building, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MotionCard } from "@/components/motion-card"
import EventGridSkeleton from "@/components/event-grid-skeleton"
import { MotionSection } from "@/components/motion-section"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { getAllKajian } from "@/lib/data"
import { Kajian } from "@/lib/types"
import HtmlContent from "@/lib/html-content"

function getStatusColor(status: string) {
  switch (status) {
    case "upcoming": return "bg-accent/10 text-accent"
    case "ongoing": return "bg-secondary/10 text-secondary"
    case "completed": return "bg-primary/10 text-primary"
    default: return "bg-muted text-muted-foreground"
  }
}

export default function KajianPage() {
  const [kajianList, setKajianList] = useState<Kajian[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllKajian()
      .then((data) => setKajianList(data?.length ? data : []))
      .catch(() => setKajianList([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Head>
        <title>Sesi Kajian | Masjid Darussalam</title>
        <meta name="description" content="Perdalam pengetahuan Islam Anda dengan kajian berkualitas dari ustadz dan instruktur ahli. Bergabunglah dengan sesi kajian di Masjid Darussalam." />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Sesi Kajian | Masjid Darussalam" />
        <meta property="og:description" content="Perdalam pengetahuan Islam Anda dengan kajian berkualitas dari ustadz dan instruktur ahli" />
        <meta property="og:site_name" content="Masjid Darussalam" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Sesi Kajian | Masjid Darussalam" />
        <meta name="twitter:description" content="Perdalam pengetahuan Islam Anda dengan kajian berkualitas dari ustadz dan instruktur ahli" />
      </Head>

      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        {/* Header */}
        <MotionSection variant="hero" className="pt-20 pb-12 px-4 sm:px-6 bg-gradient-to-b from-primary/80 to-background">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sesi Kajian</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Perdalam pengetahuan Islam Anda dengan instruktur ahli dan kursus terstruktur
            </p>
          </div>
        </MotionSection>

        {/* Kajian Grid */}
        <MotionSection className="py-16 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <EventGridSkeleton count={4} variant="kajian" />
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {kajianList.map((kajian, index) => {
                  return (
                    <Link key={kajian.id} href={`/kajian/${kajian.id}`} className="group block h-full">
                      <MotionCard index={index} className="p-6 bg-background border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl flex flex-col h-full">
                        <div className="mb-4">
                          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-lg ${getStatusColor(kajian.status)}`}>
                            {kajian.status}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {kajian.title}
                        </h3>
                        {
                          kajian.description && (
                            <HtmlContent content={kajian.description} maxLength={100} detailLink={`/kajian/${kajian.id}`} />
                          )
                        }
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
                            <Building2 className="w-4 h-4 text-primary" />
                            <span>{kajian.location}</span>
                          </div>
                        </div>
                        <Button className="w-full rounded-xl font-semibold gap-2 bg-primary hover:bg-primary/90">
                          Daftar Sekarang
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </MotionCard>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </MotionSection>

        <Footer />
      </div>
    </>
  )
}
