import { Clock, MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Aktivitas Harian | Komunitas Darussalam",
  description: "Lihat aktivitas harian dan waktu sholat di Masjid Darussalam.",
}

export default function ActivityPage() {
  const dailyActivities = [
    {
      day: "Minggu",
      activities: [
        { time: "06:00", title: "Sholat Subuh", location: "Aula Sholat Utama" },
        { time: "10:00", title: "Kelas Al-Quran Pemuda", location: "Pusat Pendidikan" },
        { time: "13:00", title: "Sholat Dzuhur", location: "Aula Sholat Utama" },
        { time: "16:00", title: "Kerja Suka Rela Komunitas", location: "Pusat Komunitas" },
        { time: "18:00", title: "Sholat Ashar", location: "Aula Sholat Utama" },
        { time: "19:30", title: "Sholat Maghrib & Isya", location: "Aula Sholat Utama" },
      ],
    },
    {
      day: "Senin",
      activities: [
        { time: "06:00", title: "Sholat Subuh", location: "Aula Sholat Utama" },
        { time: "12:00", title: "Sholat Dzuhur", location: "Aula Sholat Utama" },
        { time: "15:00", title: "Kelas Studi Islam", location: "Pusat Pendidikan" },
        { time: "18:00", title: "Sholat Ashar", location: "Aula Sholat Utama" },
        { time: "19:30", title: "Sholat Maghrib & Isya", location: "Aula Sholat Utama" },
      ],
    },
    {
      day: "Selasa hingga Kamis",
      activities: [
        { time: "06:00", title: "Sholat Subuh", location: "Aula Sholat Utama" },
        { time: "12:00", title: "Sholat Dzuhur", location: "Aula Sholat Utama" },
        { time: "18:00", title: "Sholat Ashar", location: "Aula Sholat Utama" },
        { time: "19:30", title: "Sholat Maghrib & Isya + Tarawih", location: "Aula Sholat Utama" },
      ],
    },
    {
      day: "Jumat",
      activities: [
        { time: "06:00", title: "Sholat Subuh", location: "Aula Sholat Utama" },
        { time: "13:00", title: "Sholat Jum'at", location: "Aula Sholat Utama" },
        { time: "18:00", title: "Sholat Ashar", location: "Aula Sholat Utama" },
        { time: "19:30", title: "Sholat Maghrib & Isya", location: "Aula Sholat Utama" },
      ],
    },
    {
      day: "Sabtu",
      activities: [
        { time: "06:00", title: "Sholat Subuh", location: "Aula Sholat Utama" },
        { time: "10:00", title: "Kelas Islam Anak-Anak", location: "Pusat Pendidikan" },
        { time: "13:00", title: "Sholat Dzuhur", location: "Aula Sholat Utama" },
        { time: "18:00", title: "Sholat Ashar", location: "Aula Sholat Utama" },
        { time: "19:30", title: "Sholat Maghrib & Isya", location: "Aula Sholat Utama" },
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border/40 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Kembali ke Beranda</span>
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Aktivitas Harian</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Tetap terhubung dengan aktivitas harian, waktu sholat, dan program komunitas kami sepanjang minggu.
          </p>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid gap-8 md:gap-10">
            {dailyActivities.map((daySchedule, index) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden border border-border/40 hover:shadow-lg transition-shadow"
              >
                {/* Day header */}
                <div className="bg-gradient-to-r from-primary/20 to-secondary/20 px-6 sm:px-8 py-4 border-b border-border/40">
                  <h2 className="text-2xl font-bold text-foreground">{daySchedule.day}</h2>
                </div>

                {/* Activities list */}
                <div className="bg-white p-6 sm:p-8">
                  <div className="space-y-4">
                    {daySchedule.activities.map((activity, actIndex) => (
                      <div
                        key={actIndex}
                        className="flex items-start gap-4 pb-4 border-b border-border/20 last:border-b-0 last:pb-0"
                      >
                        <div className="flex-shrink-0 w-16 font-bold text-primary text-sm">{activity.time}</div>
                        <div className="flex-grow">
                          <h3 className="font-semibold text-foreground text-lg">{activity.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                            <MapPin className="w-4 h-4" />
                            <span>{activity.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div className="mt-12 rounded-2xl bg-accent/10 border border-accent/40 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Waktu Sholat</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Waktu sholat ditampilkan dalam waktu lokal (GMT+7). Bergabunglah dengan kami untuk sholat berjamaah sepanjang hari. Komunitas kami menyambut semua orang untuk berpartisipasi dalam aktivitas spiritual dan pendidikan kami.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
