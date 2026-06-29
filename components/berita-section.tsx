"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Tag, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MotionCard } from "@/components/motion-card"
import { MotionSection } from "@/components/motion-section"
import EventGridSkeleton from "@/components/event-grid-skeleton"
import { getLatestPosts } from "@/lib/data"
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

function getExcerpt(html: string, maxLength = 120): string {
  const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  if (!text) return ''
  return text.length > maxLength ? text.slice(0, maxLength).trimEnd() + '...' : text
}

export default function BeritaSection() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getLatestPosts(3)
      .then((data) => setPosts(data?.length ? (data as Post[]) : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [])

  if (!loading && posts.length === 0) return <></>

  return (
    <MotionSection className="py-20 px-4 sm:px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-2">Berita Terkini</h2>
          <p className="text-muted-foreground">
            Informasi dan kabar terbaru dari Masjid Darussalam
          </p>
        </div>

        {loading ? (
          <div className="mb-8">
            <EventGridSkeleton count={3} variant="event" />
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 mb-8">
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

        {posts.length > 0 && (
          <div className="text-center">
            <Link href="/berita">
              <Button variant="ghost" size="lg" className="text-primary hover:bg-primary/10 font-semibold">
                Lihat Semua Berita →
              </Button>
            </Link>
          </div>
        )}
      </div>
    </MotionSection>
  )
}
