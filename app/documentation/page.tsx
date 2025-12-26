import { BookOpen, FileText, HelpCircle, Award, ArrowLeft } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Dokumentasi | Komunitas Al-Nur",
  description: "Dokumentasi, pedoman, dan sumber daya untuk anggota komunitas Al-Nur.",
}

export default function DocumentationPage() {
  const docCategories = [
    {
      icon: FileText,
      title: "Pedoman Komunitas",
      description: "Pelajari tentang nilai-nilai komunitas kami, kode etik, dan pedoman keanggotaan.",
      items: ["Piagam Komunitas", "Kode Etik", "Pedoman Keanggotaan", "Kebijakan Privasi"],
    },
    {
      icon: BookOpen,
      title: "Sumber Daya Pendidikan",
      description: "Akses koleksi materi pembelajaran Islam dan program pendidikan kami.",
      items: [
        "Program Hafalan Al-Quran",
        "Kurikulum Studi Islam",
        "Panduan Pendidikan Pemuda",
        "Materi Pembelajaran Anak-Anak",
      ],
    },
    {
      icon: Award,
      title: "Pedoman Acara",
      description: "Pahami cara berpartisipasi, mengorganisir, dan berkontribusi pada acara komunitas.",
      items: ["Proses Pendaftaran Acara", "Peluang Relawan", "Panduan Organisasi Acara", "Proses Donasi"],
    },
    {
      icon: HelpCircle,
      title: "FAQ & Dukungan",
      description: "Temukan jawaban untuk pertanyaan umum dan akses sumber daya dukungan.",
      items: ["Pertanyaan yang Sering Diajukan", "Panduan Memulai", "Kontak & Dukungan", "Dukungan Teknis"],
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
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Dokumentasi</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Panduan komprehensif, sumber daya, dan informasi untuk membantu Anda memaksimalkan manfaat dari komunitas Al-Nur.
          </p>
        </div>
      </section>

      {/* Documentation Categories */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {docCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-border/40 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Category header */}
                  <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-6 sm:px-8 py-6 flex items-start gap-4 border-b border-border/40">
                    <IconComponent className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1">{category.title}</h2>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="bg-white p-6 sm:p-8">
                    <ul className="space-y-3">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center gap-3 group cursor-pointer">
                          <div className="w-2 h-2 rounded-full bg-primary group-hover:bg-secondary transition-colors"></div>
                          <span className="text-muted-foreground group-hover:text-foreground transition-colors text-sm font-medium">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Additional Resources */}
          <div className="mt-12 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/10 border border-accent/40 p-6 sm:p-8">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-bold text-foreground mb-4">Butuh Bantuan Lebih Lanjut?</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Jika Anda tidak dapat menemukan apa yang Anda cari dalam dokumentasi kami, jangan ragu untuk menghubungi tim dukungan kami. Kami di sini untuk membantu Anda menavigasi sumber daya komunitas dan menjawab pertanyaan apa pun yang mungkin Anda miliki.
              </p>
              <Link
                href="/contact"
                className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Hubungi Dukungan
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
