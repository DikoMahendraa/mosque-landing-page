import { Clock, User, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function KajianPage() {
  const kajianSessions = [
    {
      id: 1,
      title: "Dasar-Dasar Bahasa Arab Al-Quran",
      instructor: "Sheikh Ahmad Al-Rashid",
      level: "Pemula",
      description: "Pelajari dasar-dasar bahasa dan tata bahasa Arab Al-Quran.",
      duration: "8 minggu",
      students: 32,
    },
    {
      id: 2,
      title: "Tafsir Surat Al-Kahf",
      instructor: "Dr. Fatima Al-Hassan",
      level: "Menengah",
      description: "Menyelami makna dan pelajaran dari Surat Al-Kahf.",
      duration: "10 minggu",
      students: 28,
    },
    {
      id: 3,
      title: "Etika & Moralitas Islam",
      instructor: "Ustaz Muhammad Saeed",
      level: "Semua Tingkat",
      description: "Jelajahi prinsip-prinsip Islam untuk menjalani hidup yang bermakna.",
      duration: "6 minggu",
      students: 45,
    },
    {
      id: 4,
      title: "Perempuan dalam Sejarah Islam",
      instructor: "Dr. Aisha Al-Mansouri",
      level: "Semua Tingkat",
      description: "Kisah inspiratif tentang perempuan Muslim yang luar biasa sepanjang sejarah.",
      duration: "8 minggu",
      students: 38,
    },
    {
      id: 5,
      title: "Ilmu Hadits & Metodologi",
      instructor: "Sheikh Abdullah Al-Qahtani",
      level: "Lanjutan",
      description: "Memahami ilmu autentikasi dan periwayatan hadits.",
      duration: "12 minggu",
      students: 22,
    },
    {
      id: 6,
      title: "Islam & Tantangan Modern",
      instructor: "Dr. Hassan Al-Aziz",
      level: "Menengah",
      description: "Menavigasi isu-isu kontemporer melalui kerangka Islam.",
      duration: "8 minggu",
      students: 35,
    },
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Pemula":
        return "bg-accent/10 text-accent"
      case "Menengah":
        return "bg-secondary/10 text-secondary"
      case "Lanjutan":
        return "bg-primary/10 text-primary"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Header Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 bg-gradient-to-b from-accent/20 to-background">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sesi Kajian</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Perdalam pengetahuan Islam Anda dengan instruktur ahli dan kursus terstruktur
          </p>
        </div>
      </section>

      {/* Kajian Grid */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {kajianSessions.map((kajian) => (
              <Card
                key={kajian.id}
                className="p-6 bg-background border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl flex flex-col"
              >
                {/* Level Badge */}
                <div className="mb-4">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-lg ${getLevelColor(kajian.level)}`}
                  >
                    {kajian.level}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-semibold mb-2">{kajian.title}</h3>
                <p className="text-sm text-muted-foreground mb-6 flex-grow">{kajian.description}</p>

                {/* Instructor & Details */}
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

                {/* CTA Button */}
                <Button className="w-full rounded-xl font-semibold gap-2 bg-primary hover:bg-primary/90">
                  Daftar Sekarang
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
