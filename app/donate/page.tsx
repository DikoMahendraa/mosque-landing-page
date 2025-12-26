import { Heart, TrendingUp, Users, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function DonatePage() {
  const donationTiers = [
    {
      amount: 25,
      title: "Sahabat",
      description: "Dukung program pemuda kami",
      icon: "🤝",
    },
    {
      amount: 50,
      title: "Kontributor",
      description: "Bantu danai inisiatif pendidikan",
      icon: "📚",
    },
    {
      amount: 100,
      title: "Pendukung",
      description: "Sponsori acara dan aktivitas",
      icon: "⭐",
    },
    {
      amount: 250,
      title: "Pelindung",
      description: "Dukung pengembangan komunitas",
      icon: "👑",
    },
  ]

  const impactMetrics = [
    {
      icon: Users,
      label: "Anggota Komunitas yang Dilayani",
      value: "800+",
    },
    {
      icon: TrendingUp,
      label: "Program yang Berjalan",
      value: "15+",
    },
    {
      icon: Heart,
      label: "Kehidupan yang Terdampak",
      value: "2000+",
    },
  ]

  const whyDonate = [
    {
      title: "Keterlibatan Pemuda",
      description:
        "Kami menciptakan ruang aman di mana pemuda Muslim dapat menjelajahi iman mereka, membangun persahabatan yang langgeng, dan mengembangkan keterampilan kepemimpinan.",
    },
    {
      title: "Pendidikan Berkualitas",
      description: "Program kajian kami dipimpin oleh instruktur berpengalaman yang menawarkan kursus untuk semua tingkat pengetahuan.",
    },
    {
      title: "Dukungan Komunitas",
      description: "Kami menyediakan konseling, bantuan makanan, dan dukungan darurat untuk anggota komunitas yang membutuhkan.",
    },
    {
      title: "Ruang Inklusif",
      description: "Semua orang disambut terlepas dari latar belakang, pengalaman, atau pemahaman saat ini tentang Islam.",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Header Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 bg-gradient-to-b from-primary/20 to-background">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Dukung Misi Kami</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Kemurahan hati Anda membantu kami menciptakan pengalaman yang bermakna dan peluang pendidikan untuk komunitas kami
          </p>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16 px-4 sm:px-6 bg-secondary/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {impactMetrics.map((metric, i) => {
              const Icon = metric.icon
              return (
                <Card
                  key={i}
                  className="p-8 bg-background border-0 shadow-sm hover:shadow-md transition-shadow rounded-2xl text-center"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-xl mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <p className="text-4xl font-bold text-primary mb-2">{metric.value}</p>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Donation Tiers */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Pilih Cara Anda untuk Memberi</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Setiap kontribusi membuat perbedaan yang bermakna dalam komunitas kami
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {donationTiers.map((tier, i) => (
              <Card
                key={i}
                className="p-6 bg-background border-0 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl text-center flex flex-col justify-between hover:scale-105"
              >
                <div className="mb-6">
                  <span className="text-4xl mb-3 block">{tier.icon}</span>
                  <p className="text-3xl font-bold text-primary mb-2">${tier.amount}</p>
                  <h3 className="font-semibold text-lg mb-2">{tier.title}</h3>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                </div>
                <Button className="w-full rounded-xl font-semibold gap-2 bg-primary hover:bg-primary/90">
                  Donasi ${tier.amount}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Card>
            ))}
          </div>

          {/* Custom Donation */}
          <Card className="p-8 bg-background border-0 shadow-sm rounded-2xl max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl font-bold mb-4">Donasi Kustom</h3>
            <p className="text-muted-foreground mb-6">
              Punya jumlah tertentu dalam pikiran? Kami menyambut donasi dalam ukuran apa pun untuk mendukung misi kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="number"
                placeholder="Masukkan jumlah"
                className="flex-1 px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="rounded-xl font-semibold gap-2 bg-primary hover:bg-primary/90">
                Donasi
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Why Support Section */}
      <section className="py-20 px-4 sm:px-6 bg-accent/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Mengapa Mendukung Al-Nur?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {whyDonate.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 text-primary">
                    <Check className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
