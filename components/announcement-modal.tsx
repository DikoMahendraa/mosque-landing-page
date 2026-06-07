"use client"

import { useEffect, useState } from "react"
import { X, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function AnnouncementModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if user has already seen the announcement
    const hasSeenAnnouncement = localStorage.getItem("hasSeenAnnouncement")
    if (!hasSeenAnnouncement) {
      // Small delay to ensure page is fully loaded
      const timer = setTimeout(() => {
        setIsOpen(true)
        localStorage.setItem("hasSeenAnnouncement", "true")
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-background border-0 shadow-2xl rounded-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors"
          aria-label="Tutup pengumuman"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="p-8 space-y-6">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl">
            <Bell className="w-8 h-8 text-primary" />
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground">Selamat Datang di Masjid Darussalam</h2>
            <p className="text-muted-foreground leading-relaxed">
              Bergabunglah dengan komunitas kami yang dinamis untuk acara-acara bermakna, sesi kajian yang mendalam, dan pertumbuhan spiritual.
              Jelajahi acara mendatang, daftar untuk program, dan terhubung dengan sesama anggota komunitas.
            </p>
          </div>

          {/* Important Info Box */}
          <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
            <p className="text-sm font-semibold text-primary mb-2">📍 Penting</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Jangan lewatkan Kajian Al-Quran kami pada Jumat pukul 19:00 dan Malam Olahraga Pemuda pada Sabtu pukul 18:00!
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-4">
            <Button onClick={() => setIsOpen(false)} size="lg" className="w-full rounded-xl font-semibold">
              Jelajahi Sekarang
            </Button>
            <Button
              onClick={() => setIsOpen(false)}
              variant="outline"
              size="lg"
              className="w-full rounded-xl font-semibold bg-card border-border hover:bg-card/80"
            >
              Tutup
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
