import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Sejarah | Komunitas Al-Nur",
  description: "Jelajahi sejarah dan warisan kaya komunitas Masjid Al-Nur.",
}

export default function HistoryPage() {
  const historyEvents = [
    {
      year: "2015",
      title: "Pendirian Komunitas",
      description: "Masjid komunitas Al-Nur didirikan dengan visi melayani komunitas Muslim lokal.",
      color: "bg-accent",
    },
    {
      year: "2017",
      title: "Program Haji Pertama",
      description: "Mengorganisir program Haji kolektif pertama kami untuk anggota komunitas.",
      color: "bg-secondary",
    },
    {
      year: "2019",
      title: "Pusat Pendidikan Pemuda",
      description: "Meluncurkan pusat pendidikan pemuda dengan program hafalan Al-Quran dan studi Islam.",
      color: "bg-accent",
    },
    {
      year: "2021",
      title: "Ekspansi Dapur Komunitas",
      description: "Memperluas dapur komunitas kami untuk menyajikan makanan selama Ramadan dan acara-acara khusus.",
      color: "bg-secondary",
    },
    {
      year: "2023",
      title: "Peluncuran Platform Digital",
      description: "Meluncurkan platform digital kami untuk keterlibatan komunitas dan manajemen acara yang lebih baik.",
      color: "bg-accent",
    },
    {
      year: "2024",
      title: "Jangkauan Komunitas",
      description: "Memperluas program jangkauan kami untuk mendukung keluarga yang membutuhkan dan memperkuat ikatan komunitas.",
      color: "bg-secondary",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-border/40 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Kembali ke Beranda</span>
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Sejarah Kami</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Temukan tonggak sejarah dan warisan komunitas Masjid Al-Nur sejak pendirian kami.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary/50"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              {historyEvents.map((event, index) => (
                <div key={index} className="relative pl-24">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-16 h-16 rounded-full bg-white border-4 border-primary flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{event.year}</span>
                  </div>

                  {/* Content card */}
                  <div className="rounded-2xl p-6 sm:p-8 bg-white border border-border/40 hover:shadow-lg transition-shadow">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">{event.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
