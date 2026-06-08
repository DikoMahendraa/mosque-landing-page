"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import WhatsAppButton from "./whatsapp-button"

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navItems = [
    { label: "Acara", href: "/events" },
    { label: "Kegiatan", href: "/activity" },
    { label: "Kajian", href: "/kajian" },
    { label: "Keuangan", href: "/keuangan" },
    { label: "Dokumentasi", href: "/documentation" },
    { label: "Pengurus", href: "/history" },
  ]

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300
        ${scrolled
          ? "bg-white/10 dark:bg-black/10 backdrop-blur-xl border-b border-white/30 dark:border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
          : "bg-primary/30 dark:bg-black/10 backdrop-blur-md border-b border-white/10 dark:border-white/5 shadow-none"
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image
            src="/logo.png"
            alt="Masjid Darussalam"
            width={60}
            height={60}
            className="object-contain"
            priority
          />
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">Masjid</span>
            <span className="text-base font-bold text-primary">Darussalam</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                `${scrolled && 'text-foreground'} text-sm font-medium hover:text-primary text-shadow transition-colors`
              }
            >
              {item.label}
            </Link>
          ))}
          <WhatsAppButton />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-1 rounded-lg hover:bg-white/30 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu — glass panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/20 dark:border-white/10 bg-white/80 dark:bg-black/70 backdrop-blur-xl">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium hover:text-primary hover:bg-primary/5 transition-colors py-2.5 px-3 rounded-xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
