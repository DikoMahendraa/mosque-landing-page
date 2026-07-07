import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import AnnouncementModal from "@/components/announcement-modal"
import { MobileNavProvider } from "@/components/mobile-nav-context"
import WhatsAppFloatingButton from "@/components/whatsapp-floating-button"
import FloatingPrayerTime from "@/components/floating-prayer-time"

export const metadata: Metadata = {
  metadataBase: new URL('https://masjiddarussalam.vercel.app'), // Update with your actual domain
  title: {
    default: "Masjid Darussalam | Komunitas & Pembelajaran Islam",
    template: "%s | Masjid Darussalam"
  },
  description: "Bergabunglah dengan komunitas kami yang dinamis untuk acara, kajian, dan pertumbuhan spiritual. Masjid Darussalam - Pusat kegiatan Islam dan pembelajaran.",
  keywords: ["masjid", "darussalam", "kajian islam", "acara masjid", "komunitas muslim", "pembelajaran islam", "pengajian", "kegiatan islam"],
  authors: [{ name: "Masjid Darussalam" }],
  creator: "Masjid Darussalam",
  publisher: "Masjid Darussalam",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: "Masjid Darussalam",
    title: "Masjid Darussalam | Komunitas & Pembelajaran Islam",
    description: "Bergabunglah dengan komunitas kami yang dinamis untuk acara, kajian, dan pertumbuhan spiritual",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Masjid Darussalam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Masjid Darussalam | Komunitas & Pembelajaran Islam",
    description: "Bergabunglah dengan komunitas kami yang dinamis untuk acara, kajian, dan pertumbuhan spiritual",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={`font-sans antialiased mb-12`}>
        <MobileNavProvider>
          <AnnouncementModal />
          {children}
          <WhatsAppFloatingButton />
          <FloatingPrayerTime />
        </MobileNavProvider>
        <Analytics />
      </body>
    </html>
  )
}
