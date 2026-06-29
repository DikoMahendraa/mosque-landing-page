"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Calendar, Tag, User, ArrowLeft, Copy, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MotionCard } from "@/components/motion-card"
import { MotionSection } from "@/components/motion-section"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { getPostBySlug } from "@/lib/data"
import { getEventThumbnail } from "@/lib/placeholder-images"
import { Post } from "@/lib/types"
import parse from "html-react-parser"
import Image from "next/image"
import { WhatsAppIcon } from "@/lib/whatsapp"

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function BeritaDetailPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [showShareModal, setShowShareModal] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  useEffect(() => {
    getPostBySlug(slug)
      .then((data) => setPost(data as Post | null))
      .catch(() => setPost(null))
      .finally(() => setLoading(false))
  }, [slug])

  console.log({ post })

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch { /* ignored */ }
  }

  const handleShareWhatsApp = () => {
    const text = `${post?.title}\n${shareUrl}`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="pt-32 pb-16 px-4 text-center">
          <p className="text-muted-foreground">Memuat berita...</p>
        </div>
        <Footer />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="pt-32 pb-16 px-4 text-center max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Berita Tidak Ditemukan</h1>
          <p className="text-muted-foreground mb-8">Berita yang Anda cari tidak ada atau belum diterbitkan.</p>
          <Button onClick={() => router.push('/berita')} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Berita
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  const coverImage = getEventThumbnail(post.cover_image || undefined, post.id)

  return (
    <>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        {/* Hero header */}
        {/* <MotionSection variant="hero" className="bg-gradient-to-b from-primary to-background pt-20 pb-0 px-4 sm:px-6"> */}
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.push('/berita')}
            className="mt-6 mb-6 flex items-center gap-2 text-sm font-medium text-primary/80 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Berita
          </button>

          {/* <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-primary mb-0">
              {post.category && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 text-primary text-xs font-semibold rounded-lg mb-4">
                  <Tag className="w-3 h-3" />
                  {post.category}
                </span>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{post.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-primary/70">
                {post.author && (
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    {post.author}
                  </span>
                )}
                {post.published_date && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.published_date)}
                  </span>
                )}
              </div>
            </div> */}
        </div>
        {/* </MotionSection> */}

        {/* Cover image */}
        {/* {coverImage && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-px">
            <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-b-2xl">
              <Image
                src={coverImage}
                alt={post.title}
                fill
                className="object-cover"
                unoptimized
                priority
              />
            </div>
          </div>
        )} */}

        {/* Content */}
        <MotionSection className="py-12 sm:px-6">
          <div className="">
            <div className="">
              {post.content ? (
                <div className="w-full">
                  {parse(post.content)}
                </div>
              ) : (
                <p className="text-muted-foreground italic">Tidak ada konten.</p>
              )}
            </div>


            {/* Sidebar */}
            <div className="max-w-4xl mx-auto">
              <MotionCard index={0} className="p-6 rounded-2xl border border-border sticky top-24 space-y-5">
                <div>
                  <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">Informasi</h3>
                  <div className="space-y-3">
                    {post.author && (
                      <div className="flex items-center gap-2 text-sm">
                        <User className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{post.author}</span>
                      </div>
                    )}
                    {post.published_date && (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{formatDate(post.published_date)}</span>
                      </div>
                    )}
                    {post.category && (
                      <div className="flex items-center gap-2 text-sm">
                        <Tag className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{post.category}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="h-px bg-border" />

                <Button
                  className="w-full rounded-xl font-semibold"
                  onClick={() => setShowShareModal(true)}
                >
                  Bagikan Berita
                </Button>
              </MotionCard>
            </div>

          </div>
        </MotionSection>

        <Footer />
      </div>

      {/* Share modal */}
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
              <h3 className="text-xl font-bold">Bagikan Berita</h3>
              <button onClick={() => setShowShareModal(false)} className="p-2 hover:bg-muted rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-border hover:bg-muted transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Copy className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{copySuccess ? 'Link Tersalin!' : 'Salin Link'}</p>
                  <p className="text-sm text-muted-foreground">{copySuccess ? 'Link telah disalin ke clipboard' : 'Salin link ke clipboard'}</p>
                </div>
              </button>

              <button
                onClick={handleShareWhatsApp}
                className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-border hover:bg-muted transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <WhatsAppIcon className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="font-semibold">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">Bagikan ke WhatsApp</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
