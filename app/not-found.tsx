import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      {/* 404 Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-20">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Decorative 404 */}
          <div className="space-y-4">
            <div className="relative">
              <h1 className="text-9xl md:text-[150px] font-bold text-primary/20 leading-none">404</h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">Halaman Tidak Ditemukan</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <p className="text-xl text-muted-foreground leading-relaxed">
              Maaf, kami tidak dapat menemukan halaman yang Anda cari. Halaman mungkin telah dipindahkan atau dihapus.
            </p>
            <p className="text-sm text-muted-foreground">
              Tapi jangan khawatir, masih banyak yang bisa dijelajahi di Masjid Darussalam!
            </p>
          </div>

          {/* Quick Links */}
          <div className="grid sm:grid-cols-3 gap-4 mt-12">
            <Link href="/" className="group">
              <div className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg mb-3 group-hover:bg-primary/20 transition-colors">
                  <Home className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">Beranda</h3>
                <p className="text-xs text-muted-foreground">Kembali ke beranda</p>
              </div>
            </Link>
            <Link href="/events" className="group">
              <div className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg mb-3 group-hover:bg-accent/20 transition-colors">
                  <span className="text-primary text-lg">📅</span>
                </div>
                <h3 className="font-semibold mb-1">Acara</h3>
                <p className="text-xs text-muted-foreground">Jelajahi aktivitas</p>
              </div>
            </Link>
            <Link href="/kajian" className="group">
              <div className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-secondary/20 rounded-lg mb-3 group-hover:bg-secondary/30 transition-colors">
                  <span className="text-primary text-lg">📚</span>
                </div>
                <h3 className="font-semibold mb-1">Kajian</h3>
                <p className="text-xs text-muted-foreground">Program pembelajaran</p>
              </div>
            </Link>
          </div>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-8">
            <Link href="/">
              <Button size="lg" className="rounded-xl font-semibold gap-2">
                <Home className="w-5 h-5" />
                Ke Beranda
              </Button>
            </Link>
            <Link href="/events">
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl font-semibold gap-2 bg-card border-border hover:bg-card/80"
              >
                <ArrowLeft className="w-5 h-5" />
                Lihat Acara
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
