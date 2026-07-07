"use client"

import { useRouter } from "next/navigation"
import { Clock, Compass, MapPin } from "lucide-react"
import { MotionCard } from "@/components/motion-card"
import { MotionSection } from "@/components/motion-section"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const facilities = [
  {
    title: "Waktu Sholat",
    description: "Jadwal waktu sholat harian untuk wilayah sekitar masjid",
    icon: Clock,
    href: "/fasilitas/waktu-sholat",
    gradient: "from-blue-500 to-cyan-500",
    bgLight: "bg-blue-50 dark:bg-blue-950",
    textColor: "text-blue-700 dark:text-blue-400",
  },
  {
    title: "Arah Kiblat",
    description: "Temukan arah kiblat yang akurat dari lokasi Anda",
    icon: Compass,
    href: "/fasilitas/arah-kiblat",
    gradient: "from-emerald-500 to-teal-500",
    bgLight: "bg-emerald-50 dark:bg-emerald-950",
    textColor: "text-emerald-700 dark:text-emerald-400",
  },
  {
    title: "Masjid Terdekat",
    description: "Cari masjid terdekat dari lokasi Anda saat ini",
    icon: MapPin,
    href: "/fasilitas/masjid-terdekat",
    gradient: "from-purple-500 to-pink-500",
    bgLight: "bg-purple-50 dark:bg-purple-950",
    textColor: "text-purple-700 dark:text-purple-400",
  },
]

export default function FasilitasPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Header */}
      <MotionSection 
        variant="hero" 
        className="pt-20 pb-10 px-4 sm:px-6 bg-gradient-to-b from-primary/80 to-background"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            Fasilitas Digital
          </p>
          <h1 className="text-3xl md:text-4xl font-bold">Fasilitas Ibadah</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Alat bantu untuk memudahkan ibadah Anda
          </p>
        </div>
      </MotionSection>

      <MotionSection className="px-4 sm:px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {facilities.map((facility, index) => (
              <MotionCard
                key={facility.href}
                index={index}
                className="group h-full p-6 sm:p-8 rounded-2xl border-0 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => router.push(facility.href)}
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${facility.gradient} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <facility.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {facility.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {facility.description}
                </p>

                <div className="mt-4 sm:mt-6 flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                  Buka
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </MotionCard>
            ))}
          </div>

          {/* Info Section */}
          <MotionCard index={3} className="mt-12 p-6 sm:p-8 rounded-2xl border-0 shadow-sm bg-gradient-to-br from-primary/5 to-primary/10">
            <h3 className="text-base sm:text-lg font-bold mb-3">Tentang Fasilitas</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Waktu Sholat:</strong> Menampilkan jadwal
                waktu sholat yang disesuaikan dengan lokasi masjid dan wilayah sekitar.
              </p>
              <p>
                <strong className="text-foreground">Arah Kiblat:</strong> Menggunakan sensor
                kompas pada perangkat Anda untuk menunjukkan arah kiblat yang akurat.
              </p>
              <p>
                <strong className="text-foreground">Masjid Terdekat:</strong> Menemukan masjid
                terdekat berdasarkan lokasi GPS Anda saat ini menggunakan peta interaktif.
              </p>
            </div>
          </MotionCard>
        </div>
      </MotionSection>

      <Footer />
    </div>
  )
}
