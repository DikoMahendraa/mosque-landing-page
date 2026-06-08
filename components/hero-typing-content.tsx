"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { BookOpen, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTypingText } from "@/hooks/use-typing-text"

const HERO_TAGLINES = [
  "Dari masjid kita bangkit!",
  "Bersama membangun ukhuwah islamiyah.",
  "Hati tenang, jiwa bertumbuh.",
  "Ruang untuk belajar, berbagi, dan beribadah.",
  "Komunitas yang menginspirasi generasi muda.",
  "Menjalin silaturahmi, mempererat iman.",
] as const

const TAGLINE_INTERVAL_MS = 5000
const TITLE_SPEED_MS = 45
const TAGLINE_SPEED_MS = 40

function TypingCursor({ visible }: { visible: boolean }) {
  if (!visible) return null

  return (
    <motion.span
      aria-hidden
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.5, repeat: Infinity }}
      className="inline-block w-0.5 h-7 md:h-9 bg-white/80 ml-1 align-middle"
    />
  )
}

type HeroTypingContentProps = {
  title: string
  description: string
  buttonText: string
}

export default function HeroTypingContent({ title, description, buttonText }: HeroTypingContentProps) {
  const [taglineIndex, setTaglineIndex] = useState(0)
  const { displayed: typedTitle, isComplete: titleComplete } = useTypingText(title, true, TITLE_SPEED_MS)
  const tagline = HERO_TAGLINES[taglineIndex]
  const { displayed: typedTagline, isComplete: taglineComplete } = useTypingText(
    tagline,
    titleComplete,
    TAGLINE_SPEED_MS,
  )

  const goNextTagline = useCallback(() => {
    setTaglineIndex((i) => (i + 1) % HERO_TAGLINES.length)
  }, [])

  useEffect(() => {
    if (!titleComplete || !taglineComplete) return

    const timer = setTimeout(goNextTagline, TAGLINE_INTERVAL_MS)
    return () => clearTimeout(timer)
  }, [titleComplete, taglineComplete, taglineIndex, goNextTagline])

  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight drop-shadow-lg min-h-[1.2em]">
          {typedTitle}
          <TypingCursor visible={!titleComplete} />
        </h1>

        <div className="min-h-[4rem] md:min-h-[3.5rem] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={taglineIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow font-medium"
            >
              {titleComplete ? (
                <>
                  {typedTagline}
                  <TypingCursor visible={!taglineComplete} />
                </>
              ) : (
                <span className="invisible">{tagline}</span>
              )}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: titleComplete ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-white/70 max-w-xl mx-auto leading-relaxed drop-shadow"
        >
          {description}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: titleComplete ? 1 : 0, y: titleComplete ? 0 : 12 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-3 justify-center pt-4"
      >
        <Link href="/events" className="w-full sm:w-auto">
          <Button size="lg" className="w-full rounded-xl font-semibold bg-white text-black hover:bg-white/90">
            <Calendar className="w-5 h-5 mr-2" />
            {buttonText}
          </Button>
        </Link>
        <Link href="/kajian" className="w-full sm:w-auto">
          <Button
            variant="outline"
            size="lg"
            className="w-full rounded-xl font-semibold border-white/60 text-white hover:bg-white/10 bg-transparent"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Lihat Kajian
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
