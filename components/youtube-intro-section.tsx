"use client"

import Link from "next/link"
import { ExternalLink, PlayCircle } from "lucide-react"
import { MotionSection } from "@/components/motion-section"
import { STATIC_YOUTUBE_INTRO } from "@/lib/static-content"

function getYoutubeEmbedUrl(videoId: string) {
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`
}

type YoutubeIntroSectionProps = {
  title?: string
  description?: string
  videoId?: string
  channelUrl?: string
}

export default function YoutubeIntroSection({
  title = STATIC_YOUTUBE_INTRO.title,
  description = STATIC_YOUTUBE_INTRO.description,
  videoId = STATIC_YOUTUBE_INTRO.videoId,
  channelUrl = STATIC_YOUTUBE_INTRO.channelUrl,
}: YoutubeIntroSectionProps) {
  return (
    <MotionSection className="py-20 px-4 sm:px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm mb-4">
              <PlayCircle className="w-5 h-5" />
              Video Perkenalan
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{title}</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{description}</p>
            {channelUrl ? (
              <Link
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Kunjungi channel YouTube kami
                <ExternalLink className="w-4 h-4" />
              </Link>
            ) : null}
          </div>

          <div className="rounded-2xl overflow-hidden border border-border/60 bg-background shadow-sm">
            {videoId ? (
              <div className="relative w-full aspect-video">
                <iframe
                  title={title}
                  src={getYoutubeEmbedUrl(videoId)}
                  className="absolute inset-0 w-full h-full border-0"
                  loading="eager"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="relative w-full aspect-video flex flex-col items-center justify-center gap-3 bg-muted text-muted-foreground">
                <PlayCircle className="w-12 h-12 opacity-40" />
                <p className="text-sm px-6 text-center">Video perkenalan akan segera tersedia.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MotionSection>
  )
}
