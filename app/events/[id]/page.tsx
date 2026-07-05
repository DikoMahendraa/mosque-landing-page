"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Calendar, MapPin, Users, ArrowLeft, Share2, Copy, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MotionCard } from "@/components/motion-card"
import { MotionSection } from "@/components/motion-section"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { EventRegistrationModal } from "@/components/event-registration-modal"
import { getEventById, getEventRegistrationCount } from "@/lib/data"
import { getEventThumbnail } from "@/lib/placeholder-images"
import { Event } from "@/lib/types"
import parse from "html-react-parser"
import Head from "next/head"

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.id as string

  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [showShareModal, setShowShareModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [registrationCount, setRegistrationCount] = useState(0)

  useEffect(() => {
    Promise.all([getEventById(eventId), getEventRegistrationCount(eventId)])
      .then(([data, count]) => {
        setEvent(data)
        setRegistrationCount(count)
      })
      .catch((err) => {
        console.error("Failed to fetch event:", err)
        setEvent(null)
      })
      .finally(() => setLoading(false))
  }, [eventId])

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleShareWhatsApp = () => {
    const text = `Lihat acara ini: ${event?.title}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + '\n' + shareUrl)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleShareFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(facebookUrl, '_blank', 'width=600,height=400')
  }

  // Helper function to format date
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'short'
    })
  }

  // Helper function to get background color
  const getBackgroundColor = () => {
    if (!event) return "bg-primary"
    const colors = ["bg-primary", "bg-secondary", "bg-accent"]
    const hash = event.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[hash % colors.length]
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="pt-32 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-muted-foreground">Memuat detail acara...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

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

  // Generate structured data for SEO
  const structuredData = event ? {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "description": event.description?.replace(/<[^>]+>/g, '') || '',
    "startDate": event.event_date,
    "endDate": event.event_date,
    "eventStatus": event.status === 'upcoming' ? "https://schema.org/EventScheduled" : "https://schema.org/EventCancelled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": event.location,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Indonesia",
        "addressCountry": "ID"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "Masjid Darussalam",
      "url": typeof window !== 'undefined' ? window.location.origin : ''
    },
    "offers": {
      "@type": "Offer",
      "url": typeof window !== 'undefined' ? window.location.href : '',
      "price": "0",
      "priceCurrency": "IDR",
      "availability": "https://schema.org/InStock"
    }
  } : null

  const pageUrl = typeof window !== 'undefined' ? window.location.href : ''
  const pageTitle = event ? `${event.title} | Acara` : 'Acara'
  const pageDescription = event?.description?.replace(/<[^>]+>/g, '').substring(0, 160) || 'Acara di Masjid Darussalam'
  const eventImageUrl = event ? getEventThumbnail(event.poster, event.id) : ''

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="Masjid Darussalam" />
        {eventImageUrl && <meta property="og:image" content={eventImageUrl} />}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        {eventImageUrl && <meta name="twitter:image" content={eventImageUrl} />}

        {/* Article specific */}
        {event && (
          <>
            <meta property="article:published_time" content={event.created_at} />
            <meta property="article:modified_time" content={event.updated_at} />
            <meta property="article:tag" content={event.status} />
          </>
        )}

        {/* Structured Data */}
        {structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        )}
      </Head>

      <div className="min-h-screen bg-primary text-foreground">
        <Navigation />

        {/* Header with back button */}
        <MotionSection variant="hero" className={`${getBackgroundColor()} bg-gradient-to-b to-background pt-20 pb-12 px-4 sm:px-6`}>
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
                  {event.status}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl text-black font-bold mb-4">{event.title}</h1>
              {event.description && (
                <p className="text-lg text-black line-clamp-2">{event.description.replace(/<[^>]+>/g, '')}</p>
              )}
            </div>
          </div>
        </MotionSection>

        {/* Main Content */}
        <MotionSection className="py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="md:col-span-2">
                {/* Event Image */}
                {eventImageUrl && (
                  <div className="mb-8 rounded-2xl overflow-hidden bg-muted/10">
                    <Image
                      src={eventImageUrl}
                      alt={event.title}
                      width={800}
                      height={600}
                      className="w-full h-auto"
                      unoptimized
                    />
                  </div>
                )}

                {/* About Section */}
                {event.description && (
                  <div className="mb-12">
                    <h2 className="text-2xl text-white font-bold mb-4">Tentang Acara Ini</h2>
                    <div className="text-white leading-relaxed prose prose-invert max-w-none">
                      {parse(event.description)}
                    </div>
                  </div>
                )}
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
                        <span className="font-medium">{formatDate(event.event_date)}</span>
                      </div>
                      {/* <div className="flex items-center gap-3 text-foreground">
                        <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="font-medium">{event.time}</span>
                      </div> */}
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
                        <p className="text-xs text-primary mt-1">Masjid Darussalam</p>
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
                      <span className="font-bold text-lg text-primary">{registrationCount}</span>
                      <span className="text-sm text-primary">terdaftar</span>
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-2">
                    <Button
                      className="w-full rounded-xl font-semibold bg-primary hover:bg-primary/90"
                      onClick={() => setShowRegisterModal(true)}
                    >
                      Daftar Sekarang
                    </Button>
                    <div className="flex gap-3">
                      {/* <Button variant="outline" className="flex-1 rounded-xl bg-transparent">
                        <Heart className="w-4 h-4" />
                      </Button> */}
                      <Button
                        variant="outline"
                        className="flex-1 rounded-xl bg-transparent"
                        onClick={() => setShowShareModal(true)}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </MotionCard>
              </div>
            </div>
          </div>
        </MotionSection>

        {/* Share Modal */}
        {showShareModal && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowShareModal(false)}
          >
            <div
              className="bg-background rounded-2xl p-6 max-w-md w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Bagikan Acara</h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {/* Copy Link */}
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-border hover:bg-muted transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Copy className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">
                      {copySuccess ? 'Link Tersalin!' : 'Salin Link'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {copySuccess ? 'Link telah disalin ke clipboard' : 'Salin link ke clipboard'}
                    </p>
                  </div>
                </button>

                {/* WhatsApp */}
                <button
                  onClick={handleShareWhatsApp}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-border hover:bg-muted transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">WhatsApp</p>
                    <p className="text-sm text-muted-foreground">Bagikan ke WhatsApp</p>
                  </div>
                </button>

                {/* Facebook */}
                <button
                  onClick={handleShareFacebook}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-border hover:bg-muted transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Facebook</p>
                    <p className="text-sm text-muted-foreground">Bagikan ke Facebook</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        <EventRegistrationModal
          eventId={event.id}
          eventTitle={event.title}
          open={showRegisterModal}
          onClose={() => setShowRegisterModal(false)}
          onSuccess={() => setRegistrationCount((count) => count + 1)}
        />
      </div>
      <Footer />
    </>
  )
}
