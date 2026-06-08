import Link from "next/link"
import { MapPin, ExternalLink } from "lucide-react"
import { MOSQUE_LOCATION, MOSQUE_MAPS_EMBED_URL, MOSQUE_MAPS_LINK } from "@/lib/mosque-location"

export default function Footer() {
  return (
    <footer className="bg-primary/20 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">{MOSQUE_LOCATION.name}</h3>
            <p className="text-sm text-muted-foreground">
              Membangun komunitas, memupuk pembelajaran, dan memelihara iman.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-muted-foreground hover:text-foreground">
                  Acara
                </Link>
              </li>
              <li>
                <Link href="/kajian" className="text-muted-foreground hover:text-foreground">
                  Kajian
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Telepon: +62 858-3070-4219</li>
              <li>Email: info@darussalam.org</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Ikuti Kami</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  YouTube
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-8 rounded-2xl overflow-hidden border border-border/60 bg-background/50">
          <div className="grid md:grid-cols-5 gap-0">
            <div className="md:col-span-2 p-6 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <h4 className="font-semibold">Lokasi Masjid</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {MOSQUE_LOCATION.address}
              </p>
              <a
                href={MOSQUE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors w-fit"
              >
                Buka di Google Maps
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="md:col-span-3 relative min-h-[220px] md:min-h-[260px]">
              <iframe
                title={`Peta lokasi ${MOSQUE_LOCATION.name}`}
                src={MOSQUE_MAPS_EMBED_URL}
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 {MOSQUE_LOCATION.name}. Hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
