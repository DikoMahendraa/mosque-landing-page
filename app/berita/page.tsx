"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Tag, User, Newspaper } from "lucide-react"
import { MotionCard } from "@/components/motion-card"
import { MotionSection } from "@/components/motion-section"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import EventGridSkeleton from "@/components/event-grid-skeleton"
import { getAllPosts } from "@/lib/data"
import { getEventThumbnail } from "@/lib/placeholder-images"
import { Post } from "@/lib/types"

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function getExcerpt(html: string, maxLength = 130): string {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  if (!text) return ''
  return text.length > maxLength ? text.slice(0, maxLength).trimEnd() + '...' : text
}

export default function BeritaPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllPosts()
      .then((data) => setPosts((data as Post[]) ?? []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <MotionSection variant="hero" className="bg-gradient-to-b from-primary to-background pt-20 pb-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center text-primary pt-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <Newspaper className="w-4 h-4" />
            Berita & Informasi
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Berita Terkini</h1>
          <p className="text-lg text-primary max-w-2xl mx-auto">
            Temukan informasi dan kabar terbaru seputar kegiatan Masjid Darussalam
          </p>
        </div>
      </MotionSection>

      <MotionSection className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <EventGridSkeleton count={6} variant="event" />
          ) : posts.length === 0 ? (
            <div className="text-center py-24">
              <Newspaper className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Belum ada berita</h2>
              <p className="text-muted-foreground">Pantau terus untuk informasi terbaru dari kami.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <Link key={post.id} href={`/berita/${post.slug}`} className="group block h-full">
                  <MotionCard
                    index={index}
                    className="overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl h-full flex flex-col"
                  >
                    <div className="relative h-44 w-full overflow-hidden shrink-0">
                      <Image
                        src={getEventThumbnail(post.cover_image || undefined, post.id)}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        unoptimized
                      />
                      {post.category && (
                        <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 bg-primary text-white text-xs font-semibold rounded-lg">
                          <Tag className="w-3 h-3" />
                          {post.category}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col flex-1 p-5 bg-background">
                      <h3 className="font-semibold text-base mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      {getExcerpt(post.content) && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-3 flex-1">
                          {getExcerpt(post.content)}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mt-auto pt-3 border-t border-border">
                        {post.author && (
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {post.author}
                          </span>
                        )}
                        {post.published_date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.published_date)}
                          </span>
                        )}
                      </div>
                    </div>
                  </MotionCard>
                </Link>
              ))}
            </div>
          )}
        </div>
      </MotionSection>

      <Footer />
    </div>
  )
}
