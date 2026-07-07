"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Head from "next/head"
import { Clock, User, Award, ArrowRight, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MotionCard } from "@/components/motion-card"
import EventGridSkeleton from "@/components/event-grid-skeleton"
import { MotionSection } from "@/components/motion-section"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
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
      return "bg-accent/10 text-accent"
    case "ongoing":
      return "bg-secondary/10 text-secondary"
    case "completed":
    case "finished":
      return "bg-primary/10 text-primary"
    default:
      return "bg-muted text-muted-foreground"
  }
}

export default function KajianPage() {
  const router = useRouter()
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
            ) : kajianList.length === 0 ? (
              <div className="text-center py-20">
                <MotionCard index={0} className="max-w-md mx-auto p-12 rounded-2xl border-0 shadow-sm">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Belum Ada Kajian</h3>
                  <p className="text-muted-foreground mb-6">
                    Saat ini belum ada sesi kajian yang tersedia. Silakan cek kembali nanti untuk informasi kajian terbaru.
                  </p>
                  <Link href="/">
                    <Button variant="outline" className="gap-2">
                      <ArrowRight className="w-4 h-4 rotate-180" />
                      Kembali ke Beranda
                    </Button>
                  </Link>
                </MotionCard>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {kajianList.map((kajian, index) => {
                  return (
                    <MotionCard 
                      key={kajian.id} 
                      index={index} 
                      className="group p-6 bg-background border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl flex flex-col h-full cursor-pointer"
                      onClick={() => router.push(`/kajian/${kajian.id}`)}
                    >
                      <div className="mb-4">
                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-lg ${getStatusColor(kajian.status)}`}>
                          {translateStatus(kajian.status)}
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
