"use client"

import { useParams, useRouter } from "next/navigation"
import { User, Clock, Award, ArrowLeft, Share2, Heart, BookOpen, UsersIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function KajianDetailPage() {
  const params = useParams()
  const router = useRouter()
  const kajianId = Number.parseInt(params.id as string)

  const kajianData = [
    {
      id: 1,
      title: "Dasar-Dasar Bahasa Arab Al-Quran",
      instructor: "Sheikh Ahmad Al-Rashid",
      level: "Pemula",
      description: "Pelajari dasar-dasar bahasa dan tata bahasa Arab Al-Quran.",
      duration: "8 minggu",
      students: 32,
      fullDescription:
        "Kuasai elemen dasar bahasa Arab Al-Quran dengan kursus komprehensif kami. Pelajari untuk mengenali dan memahami kosakata serta pola tata bahasa unik Al-Quran, memungkinkan Anda membaca dan memahami pesan ilahi dengan lebih mendalam.",
      syllabus: [
        "Pengenalan alfabet dan pengucapan bahasa Arab Al-Quran",
        "Aturan tata bahasa dasar dan struktur kalimat",
        "Kosakata Al-Quran umum dan akar kata",
        "Analisis ayat Al-Quran sederhana",
      ],
      schedule: "Setiap Sabtu, 19:00 - 20:30",
      image: "bg-primary",
    },
    {
      id: 2,
      title: "Tafsir Surat Al-Kahf",
      instructor: "Dr. Fatima Al-Hassan",
      level: "Menengah",
      description: "Menyelami makna dan pelajaran dari Surat Al-Kahf.",
      duration: "10 minggu",
      students: 28,
      fullDescription:
        "Jelajahi kisah dan pelajaran mendalam dalam Surat Al-Kahf, salah satu surat terpenting dalam Al-Quran. Kursus ini menyediakan tafsir (penafsiran) detail yang membantu Anda memahami konteks, makna, dan aplikasi kontemporer dari ayat-ayat ini.",
      syllabus: [
        "Kisah Dzulqarnain",
        "Ashabul Kahfi (penghuni gua)",
        "Kisah pemilik dua kebun",
        "Tema iman dan ujian",
      ],
      schedule: "Setiap Minggu, 15:00 - 16:30",
      image: "bg-secondary",
    },
    {
      id: 3,
      title: "Etika & Moralitas Islam",
      instructor: "Ustaz Muhammad Saeed",
      level: "Semua Tingkat",
      description: "Jelajahi prinsip-prinsip Islam untuk menjalani hidup yang bermakna.",
      duration: "6 minggu",
      students: 45,
      fullDescription:
        "Bangun karakter dan kembangkan kompas moral yang kuat yang dipandu oleh ajaran Islam. Kursus ini mengeksplorasi dilema etika, kebajikan, dan cara menerapkan prinsip-prinsip Islam pada tantangan modern.",
      syllabus: [
        "Karakter Islam (Akhlaq)",
        "Keadilan dan kejujuran",
        "Kasih sayang dan rahmat",
        "Integritas dalam kehidupan sehari-hari",
      ],
      schedule: "Setiap Rabu, 19:30 - 20:30",
      image: "bg-accent",
    },
    {
      id: 4,
      title: "Perempuan dalam Sejarah Islam",
      instructor: "Dr. Aisha Al-Mansouri",
      level: "Semua Tingkat",
      description: "Kisah inspiratif tentang perempuan Muslim yang luar biasa sepanjang sejarah.",
      duration: "8 minggu",
      students: 38,
      fullDescription:
        "Temukan kontribusi dan pencapaian luar biasa perempuan sepanjang sejarah Islam. Dari ulama dan pemimpin hingga aktivis dan pendidik, pelajari tentang perempuan Muslim yang membentuk umat kita.",
      syllabus: [
        "Istri dan putri Nabi",
        "Ulama dan ahli hukum perempuan",
        "Pemimpin dan pejuang perempuan",
        "Teladan perempuan Muslim kontemporer",
      ],
      schedule: "Setiap Kamis, 19:00 - 20:30",
      image: "bg-primary",
    },
    {
      id: 5,
      title: "Ilmu Hadits & Metodologi",
      instructor: "Sheikh Abdullah Al-Qahtani",
      level: "Lanjutan",
      description: "Memahami ilmu autentikasi dan periwayatan hadits.",
      duration: "12 minggu",
      students: 22,
      fullDescription:
        "Menyelami metodologi ilmiah pengumpulan, pelestarian, dan autentikasi hadits. Pelajari kriteria yang digunakan ulama untuk mengevaluasi keaslian dan keandalan hadits.",
      syllabus: [
        "Terminologi dan penilaian hadits",
        "Rantai periwayatan (Isnad)",
        "Analisis teks (Matn)",
        "Koleksi hadits terkenal",
      ],
      schedule: "Setiap Jumat, 18:00 - 19:30",
      image: "bg-secondary",
    },
    {
      id: 6,
      title: "Islam & Tantangan Modern",
      instructor: "Dr. Hassan Al-Aziz",
      level: "Menengah",
      description: "Menavigasi isu-isu kontemporer melalui kerangka Islam.",
      duration: "8 minggu",
      students: 35,
      fullDescription:
        "Terapkan ajaran Islam untuk mengatasi tantangan modern termasuk teknologi, media sosial, kesehatan mental, dan hubungan antaragama. Pelajari cara menemukan solusi Islam untuk isu-isu kontemporer.",
      syllabus: ["Islam dan teknologi", "Etika media sosial", "Kesehatan mental dalam Islam", "Dialog antaragama"],
      schedule: "Setiap Selasa, 19:30 - 20:30",
      image: "bg-accent",
    },
  ]

  const kajian = kajianData.find((k) => k.id === kajianId)

  if (!kajian) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Kursus Tidak Ditemukan</h1>
            <p className="text-muted-foreground mb-8">Kursus yang Anda cari tidak ada.</p>
            <Button onClick={() => router.back()} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Kembali
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

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

      {/* Header with back button */}
      <section className={`${kajian.image} bg-gradient-to-b to-background pt-20 pb-12 px-4 sm:px-6`}>
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity text-white/90"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Kajian
          </button>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
            <div className="mb-4">
              <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-lg bg-white/20 text-white`}>
                {kajian.level}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{kajian.title}</h1>
            <p className="text-lg text-white/80">{kajian.description}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              {/* About Section */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Tentang Kursus Ini</h2>
                <p className="text-muted-foreground leading-relaxed">{kajian.fullDescription}</p>
              </div>

              {/* Syllabus */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Silabus Kursus</h2>
                <div className="space-y-3">
                  {kajian.syllabus.map((topic, idx) => (
                    <Card key={idx} className="p-4 bg-secondary/5 border-0 rounded-xl flex items-start gap-3">
                      <BookOpen className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="font-medium">{topic}</span>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Instructor */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Instruktur</h2>
                <Card className="p-6 bg-accent/5 border-0 rounded-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-foreground">{kajian.instructor}</p>
                      <p className="text-sm text-muted-foreground">Instruktur Ahli</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Pendidik berpengalaman yang berdedikasi untuk membuat pengetahuan Islam dapat diakses dan transformatif.
                  </p>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <Card className="p-6 bg-background border-2 border-secondary/20 rounded-2xl sticky top-24 space-y-6">
                {/* Level */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Tingkat</h3>
                  <span
                    className={`inline-block px-3 py-2 text-sm font-semibold rounded-lg ${getLevelColor(kajian.level)}`}
                  >
                    {kajian.level}
                  </span>
                </div>

                <div className="h-px bg-border" />

                {/* Schedule */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Jadwal
                  </h3>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">{kajian.schedule}</p>
                      <p className="text-xs text-muted-foreground mt-1">Kursus {kajian.duration}</p>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Enrolled */}
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Pendaftaran
                  </h3>
                  <div className="flex items-center gap-3">
                    <UsersIcon className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-bold text-lg text-foreground">{kajian.students}</span>
                    <span className="text-sm text-muted-foreground">terdaftar</span>
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Certificate */}
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Sertifikat Disertakan</p>
                    <p className="text-xs text-muted-foreground mt-1">Setelah selesai</p>
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Action Buttons */}
                <div className="space-y-3 pt-2">
                  <Button className="w-full rounded-xl font-semibold bg-primary hover:bg-primary/90">Daftar Sekarang</Button>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 rounded-xl bg-transparent">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-xl bg-transparent">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
