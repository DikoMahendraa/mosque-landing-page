"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Clock, User, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MotionCard } from "@/components/motion-card"
import { MotionSection } from "@/components/motion-section"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { getAllKajian } from "@/lib/data"
import { Kajian } from "@/lib/types"

const FALLBACK_KAJIAN: Kajian[] = [
  {
    id: "1",
    title: "Dasar-Dasar Bahasa Arab Al-Quran",
    instructor: "Sheikh Ahmad Al-Rashid",
    level: "Pemula",
    description: "Pelajari dasar-dasar bahasa dan tata bahasa Arab Al-Quran.",
    duration: "8 minggu",
    students: 32,
    active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "2",
    title: "Tafsir Surat Al-Kahf",
    instructor: "Dr. Fatima Al-Hassan",
    level: "Menengah",
    description: "Menyelami makna dan pelajaran dari Surat Al-Kahf.",
    duration: "10 minggu",
    students: 28,
    active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "3",
    title: "Etika & Moralitas Islam",
    instructor: "Ustaz Muhammad Saeed",
    level: "Semua",
    description: "Panduan komprehensif tentang akhlak dan etika Islam dalam kehidupan modern.",
    duration: "6 minggu",
    students: 45,
    active: true,
    created_at: "",
    updated_at: "",
  },
  {
    id: "4",
    title: "Fikih Ibadah Praktis",
    instructor: "Dr. Aisha Rahman",
    level: "Pemula",
    description: "Panduan praktis tata cara shalat, puasa, zakat, dan ibadah sehari-hari.",
    duration: "12 minggu",
    students: 38,
    active: true,
    created_at: "",
    updated_at: "",
  },
]

function getLevelColor(level: string) {
  switch (level) {
    case "Pemula": return "bg-accent/10 text-accent"
    case "Menengah": return "bg-secondary/10 text-secondary"
    case "Lanjutan": return "bg-primary/10 text-primary"
    default: return "bg-muted text-muted-foreground"
  }
}

export default function KajianPage() {
  const [kajianList, setKajianList] = useState<Kajian[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllKajian()
      .then((data) => setKajianList(data?.length ? data : FALLBACK_KAJIAN))
      .catch(() => setKajianList(FALLBACK_KAJIAN))
      .finally(() => setLoading(false))
  }, [])

  return (
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
            <div className="grid md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="p-6 rounded-2xl animate-pulse">
                  <div className="h-4 bg-muted rounded w-1/4 mb-4" />
                  <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-full mb-6" />
                  <div className="space-y-3 mb-6">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="h-4 bg-muted rounded w-1/2" />
                    ))}
                  </div>
                  <div className="h-10 bg-muted rounded-xl" />
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {kajianList.map((kajian, index) => (
                <Link key={kajian.id} href={`/kajian/${kajian.id}`} className="group block h-full">
                  <MotionCard index={index} className="p-6 bg-background border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl flex flex-col h-full">
                    <div className="mb-4">
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-lg ${getLevelColor(kajian.level)}`}>
                        {kajian.level}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {kajian.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6 flex-grow">{kajian.description}</p>
                    <div className="space-y-3 mb-6 text-sm border-t border-border pt-4">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <User className="w-4 h-4 flex-shrink-0 text-primary" />
                        <span className="font-medium">{kajian.instructor}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Clock className="w-4 h-4 flex-shrink-0 text-accent" />
                        <span>{kajian.duration}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Award className="w-4 h-4 flex-shrink-0 text-secondary" />
                        <span>{kajian.students} peserta terdaftar</span>
                      </div>
                    </div>
                    <Button className="w-full rounded-xl font-semibold gap-2 bg-primary hover:bg-primary/90">
                      Daftar Sekarang
                      <ArrowRight className="w-4 h-4" />
                    </Button>
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
