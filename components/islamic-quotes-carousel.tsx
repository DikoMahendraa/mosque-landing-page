"use client"

import { useCallback, useEffect, useState } from "react"
import { useTypingText } from "@/hooks/use-typing-text"
import Link from "next/link"
import { Amiri } from "next/font/google"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MotionSection } from "@/components/motion-section"

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] })

const ISLAMIC_QUOTES = [
  {
    arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ",
    translation: "Sesungguhnya amalan itu bergantung pada niatnya.",
    source: "HR. Bukhari & Muslim",
  },
  {
    arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
    translation: "Barangsiapa beriman kepada Allah dan hari akhir, hendaklah ia berkata baik atau diam.",
    source: "HR. Bukhari & Muslim",
  },
  {
    arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    translation:
      "Tidak beriman seseorang di antara kamu hingga ia mencintai untuk saudaranya apa yang ia cintai untuk dirinya sendiri.",
    source: "HR. Bukhari & Muslim",
  },
  {
    arabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
    translation: "Muslim sejati adalah orang yang kaum Muslimin selamat dari lisan dan tangannya.",
    source: "HR. Bukhari & Muslim",
  },
  {
    arabic: "تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ صَدَقَةٌ",
    translation: "Senyummu di hadapan saudaramu adalah sedekah.",
    source: "HR. Tirmidzi",
  },
  {
    arabic: "الصَّدَقَةُ تُطْفِئُ الْخَطِيئَةَ كَمَا يُطْفِئُ الْمَاءُ النَّارَ",
    translation: "Sedekah memadamkan dosa sebagaimana air memadamkan api.",
    source: "HR. Tirmidzi",
  },
] as const

const AUTO_INTERVAL_MS = 12000

function QuoteSlide({
  quote,
  isActive,
}: {
  quote: (typeof ISLAMIC_QUOTES)[number]
  isActive: boolean
}) {
  const { displayed, isComplete } = useTypingText(quote.translation, isActive, 35)

  return (
    <div className="space-y-6">
      <motion.p
        dir="rtl"
        lang="ar"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`${amiri.className} text-2xl sm:text-3xl md:text-4xl leading-loose text-white/95`}
      >
        «{quote.arabic}»
      </motion.p>

      <p className="text-lg sm:text-xl text-white/90 leading-relaxed min-h-[4.5rem] sm:min-h-[3.5rem]">
        {displayed}
        {!isComplete && (
          <motion.span
            aria-hidden
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-0.5 h-5 sm:h-6 bg-white/80 ml-1 align-middle"
          />
        )}
      </p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: isComplete ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="text-sm text-white/60 italic"
      >
        — {quote.source}
      </motion.p>
    </div>
  )
}

export default function IslamicQuotesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + ISLAMIC_QUOTES.length) % ISLAMIC_QUOTES.length)
  }, [])

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])

  useEffect(() => {
    const timer = setInterval(goNext, AUTO_INTERVAL_MS)
    return () => clearInterval(timer)
  }, [goNext])

  const quote = ISLAMIC_QUOTES[activeIndex]

  return (
    <MotionSection className="py-20 px-4 sm:px-6 bg-primary overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-3">
          Kutipan Islami
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10">Hikmah untuk Hati</h2>

        <div className="relative">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Kutipan sebelumnya"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:translate-x-0 z-10 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={goNext}
            aria-label="Kutipan berikutnya"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-0 z-10 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="px-10 sm:px-14 min-h-[220px] sm:min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <QuoteSlide quote={quote} isActive />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8 mb-10">
          {ISLAMIC_QUOTES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Kutipan ${i + 1}`}
              aria-current={i === activeIndex ? "true" : undefined}
              className={`rounded-full transition-all duration-300 ${i === activeIndex ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/40 hover:bg-white/70"
                }`}
            />
          ))}
        </div>

        {/* <div className="space-y-3">
          <p className="text-white/80 text-sm sm:text-base">
            Dukung inisiatif komunitas kami dan bantu kami menciptakan pengalaman yang bermakna
          </p>
          <Link href="/donate">
            <Button size="lg" className="rounded-xl hover:bg-white text-primary bg-white font-semibold gap-2">
              <Heart className="w-5 h-5" />
              Donasi Sekarang
            </Button>
          </Link>
        </div> */}
      </div>
    </MotionSection>
  )
}
