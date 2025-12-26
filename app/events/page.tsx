import Link from "next/link"
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function EventsPage() {
  const events = [
    {
      id: 1,
      title: "Kajian Al-Quran",
      date: "Jumat, 27 Des",
      time: "19:00 - 20:30",
      location: "Aula Utama",
      attendees: 45,
      description: "Sesi pembacaan Al-Quran dan tafsir mingguan untuk semua tingkat.",
      category: "Pembelajaran",
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
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Header Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 bg-gradient-to-b from-secondary/20 to-background">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Acara Mendatang</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Bergabunglah dengan komunitas kami yang dinamis untuk pengalaman yang memperkaya dan koneksi yang bermakna
          </p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`} className="group">
                <Card className="p-6 bg-background border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl h-full">
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-lg">
                      {event.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">{event.description}</p>

                  {/* Event Details */}
                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Calendar className="w-4 h-4 flex-shrink-0 text-primary" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span className="w-4 h-4 flex-shrink-0">⏰</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="w-4 h-4 flex-shrink-0 text-accent" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 font-medium text-primary">
                      <Users className="w-4 h-4 flex-shrink-0" />
                      <span>{event.attendees} terdaftar</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button className="w-full rounded-xl font-semibold gap-2 bg-primary hover:bg-primary/90">
                    Lihat Detail
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
