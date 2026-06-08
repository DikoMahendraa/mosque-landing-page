"use client"

import { useParams, useRouter } from "next/navigation"
import { Calendar, MapPin, Users, Clock, ArrowLeft, Share2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MotionCard } from "@/components/motion-card"
import { MotionSection } from "@/components/motion-section"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = Number.parseInt(params.id as string)

  const eventsData = [
    {
      id: 1,
      title: "Kajian Al-Quran",
      date: "Jumat, 27 Des",
      time: "19:00 - 20:30",
      location: "Aula Utama",
      attendees: 45,
      description: "Sesi pembacaan Al-Quran dan tafsir mingguan untuk semua tingkat.",
      category: "Pembelajaran",
      fullDescription:
        "Bergabunglah dengan kajian Al-Quran mingguan kami di mana kita menjelajahi makna dan pelajaran Al-Quran bersama. Sesi ini sempurna untuk semua tingkat - baik Anda pemula atau mahasiswa lanjutan. Kami membahas tafsir (penafsiran) dan mendiskusikan bagaimana ajaran Al-Quran diterapkan dalam kehidupan sehari-hari kita.",
      features: ["Ramah pemula", "Sesi mingguan", "Panduan ahli", "Tanya jawab interaktif"],
      speaker: "Sheikh Ahmad Al-Rashid",
      image: "bg-primary",
    },
    {
      id: 2,
      title: "Malam Olahraga Pemuda",
      date: "Sabtu, 28 Des",
      time: "18:00 - 20:00",
      location: "Lapangan Olahraga",
      attendees: 32,
      description: "Sepak bola, basket, dan bulu tangkis untuk pemuda usia 15-35 tahun.",
      category: "Komunitas",
      fullDescription:
        "Aktif dan terhubung dengan komunitas! Malam olahraga pemuda kami menampilkan berbagai olahraga termasuk sepak bola, basket, dan bulu tangkis. Ini adalah cara yang bagus untuk tetap sehat, bersenang-senang, dan membangun persahabatan dengan sesama anggota komunitas.",
      features: ["Berbagai olahraga", "Semua tingkat keahlian diterima", "Hidangan gratis", "Jaringan sosial"],
      speaker: "Koordinator Pemuda",
      image: "bg-secondary",
    },
    {
      id: 3,
      title: "Workshop Keuangan Islam",
      date: "Minggu, 29 Des",
      time: "15:00 - 17:00",
      location: "Pusat Komunitas",
      attendees: 28,
      description: "Pelajari prinsip investasi halal dan perencanaan keuangan.",
      category: "Workshop",
      fullDescription:
        "Temukan cara mengelola keuangan Anda sesuai dengan prinsip-prinsip Islam. Workshop ini mencakup investasi halal, strategi tabungan, dan cara membangun kekayaan sambil mempertahankan standar etika.",
      features: ["Perencanaan keuangan", "Investasi halal", "Pembicara ahli", "Sertifikat kehadiran"],
      speaker: "Dr. Muhammad Hassan",
      image: "bg-accent",
    },
    {
      id: 4,
      title: "Buka Puasa Bersama",
      date: "Rabu, 1 Jan",
      time: "18:30",
      location: "Aula Makan",
      attendees: 120,
      description: "Bergabunglah dengan kami untuk berbuka puasa bersama seluruh komunitas.",
      category: "Sosial",
      fullDescription:
        "Rasakan semangat komunitas selama pertemuan buka puasa khusus kami. Berbagi makanan dengan saudara dan saudari Anda, memperkuat ikatan, dan menciptakan kenangan abadi bersama.",
      features: ["Makanan tradisional", "Ramah keluarga", "Pertemuan komunitas", "Suasana istimewa"],
      speaker: "Tim Komunitas",
      image: "bg-primary",
    },
    {
      id: 5,
      title: "Kelas Perempuan",
      date: "Kamis, 2 Jan",
      time: "19:00 - 20:30",
      location: "Aula Perempuan",
      attendees: 35,
      description: "Sesi eksklusif untuk perempuan untuk membahas iman, kehidupan, dan persaudaraan.",
      category: "Komunitas",
      fullDescription:
        "Ruang yang aman dan mendukung bagi perempuan untuk terhubung, berbagi pengalaman, dan mendiskusikan topik-topik yang relevan dengan perjalanan iman mereka. Topik termasuk menyeimbangkan kehidupan modern dengan nilai-nilai Islam dan pertumbuhan pribadi.",
      features: ["Hanya perempuan", "Ruang aman", "Diskusi terbuka", "Pertumbuhan spiritual"],
      speaker: "Dr. Aisha Al-Mansouri",
      image: "bg-secondary",
    },
    {
      id: 6,
      title: "Seri Diskusi Karir",
      date: "Jumat, 3 Jan",
      time: "18:30 - 20:00",
      location: "Ruang Pertemuan",
      attendees: 40,
      description: "Profesional muda berbagi wawasan tentang karir dan menyeimbangkan iman.",
      category: "Workshop",
      fullDescription:
        "Belajar dari profesional Muslim yang sukses tentang menavigasi karir sambil mempertahankan iman dan nilai-nilai Anda. Dapatkan saran tentang wawancara, promosi, etika tempat kerja, dan pengembangan profesional.",
      features: ["Ahli industri", "Jaringan", "Sesi tanya jawab", "Tips karir"],
      speaker: "Panel Profesional",
      image: "bg-accent",
    },
  ]

  const event = eventsData.find((e) => e.id === eventId)

  if (!event) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Acara Tidak Ditemukan</h1>
            <p className="text-muted-foreground mb-8">Acara yang Anda cari tidak ada.</p>
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

  return (
    <div className="min-h-screen bg-primary text-foreground">
      <Navigation />

      {/* Header with back button */}
      <MotionSection variant="hero" className={`${event.image} bg-gradient-to-b to-background pt-20 pb-12 px-4 sm:px-6`}>
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2 cursor-pointer text-sm font-medium hover:opacity-80 transition-opacity text-white/90"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Acara
          </button>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-white">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-primary/50 backdrop-blur text-white text-xs font-semibold rounded-lg">
                {event.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl text-black font-bold mb-4">{event.title}</h1>
            <p className="text-lg text-black">{event.description}</p>
          </div>
        </div>
      </MotionSection>

      {/* Main Content */}
      <MotionSection className="py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              {/* About Section */}
              <div className="mb-12">
                <h2 className="text-2xl text-white font-bold mb-4">Tentang Acara Ini</h2>
                <p className="text-white leading-relaxed mb-6">{event.fullDescription}</p>
              </div>

              {/* Features */}
              <div className="mb-12">
                <h2 className="text-2xl text-white font-bold mb-6">Yang Akan Didapatkan</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {event.features.map((feature, idx) => (
                    <MotionCard key={idx} index={idx} className="p-4 border-0 rounded-xl flex items-center gap-3 bg-white text-primary">
                      <span className="font-medium">&#8226; {feature}</span>
                    </MotionCard>
                  ))}
                </div>
              </div>

              {/* Speaker */}
              <div className="mb-12">
                <h2 className="text-2xl text-white font-bold mb-4">Penyelenggara Acara</h2>
                <MotionCard index={0} className="p-6 bg-white border-0 text-primary rounded-2xl">
                  <p className="text-lg font-semibold">{event.speaker}</p>
                  <p className="text-sm mt-2">Memimpin sesi ini dengan keahlian dan semangat</p>
                </MotionCard>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <MotionCard index={0} className="p-6 bg-background border-2 border-secondary/20 rounded-2xl sticky top-24 space-y-6">
                {/* Date & Time */}
                <div>
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Kapan</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-foreground">
                      <Calendar className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="font-medium">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-foreground">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="font-medium">{event.time}</span>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Location */}
                <div>
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">Dimana</h3>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium">{event.location}</p>
                      <p className="text-xs text-primary mt-1">Masjid Darussalam, Area Komunitas</p>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Attendees */}
                <div>
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                    Peserta
                  </h3>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-bold text-lg text-primary">{event.attendees}</span>
                    <span className="text-sm text-primary">terdaftar</span>
                  </div>
                </div>

                <div className="h-px bg-border" />

                {/* Action Buttons */}
                <div className="space-y-3 pt-2">
                  <Button className="w-full rounded-xl font-semibold bg-primary hover:bg-primary/90">
                    Daftar Sekarang
                  </Button>
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 rounded-xl bg-transparent">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-xl bg-transparent">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </MotionCard>
            </div>
          </div>
        </div>
      </MotionSection>

      <Footer />
    </div>
  )
}
