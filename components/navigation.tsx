"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import WhatsAppButton from "./whatsapp-button"
import { useMobileNav } from "./mobile-nav-context"
import { WA_LINK, WhatsAppIcon } from "@/lib/whatsapp"

const MENU_EASE = [0.22, 1, 0.36, 1] as const

type NavItem = {
  label: string
  href: string
  dropdown?: { label: string; href: string }[]
}

export default function Navigation() {
  const { isOpen: mobileMenuOpen, setIsOpen: setMobileMenuOpen } = useMobileNav()
  const [scrolled, setScrolled] = useState(false)
  const navBarRef = useRef<HTMLDivElement>(null)
  const [navHeight, setNavHeight] = useState(72)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const updateHeight = () => {
      if (navBarRef.current) setNavHeight(navBarRef.current.offsetHeight)
    }
    updateHeight()
    window.addEventListener("resize", updateHeight)
    return () => window.removeEventListener("resize", updateHeight)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  const navItems: NavItem[] = [
    { label: "Acara", href: "/events" },
    { label: "Kajian", href: "/kajian" },
    { label: "Berita", href: "/berita" },
    { 
      label: "Fasilitas", 
      href: "/fasilitas",
      dropdown: [
        { label: "Waktu Sholat", href: "/fasilitas/waktu-sholat" },
        { label: "Arah Kiblat", href: "/fasilitas/arah-kiblat" },
        { label: "Masjid Terdekat", href: "/fasilitas/masjid-terdekat" }
      ]
    },
    { label: "Keuangan", href: "/keuangan" },
    { label: "Pengurus", href: "/structure" },
  ]

  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300
          ${scrolled
            ? "bg-white/10 dark:bg-black/10 backdrop-blur-xl border-b border-white/30 dark:border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
            : "bg-primary/30 dark:bg-black/10 backdrop-blur-md border-b border-white/10 dark:border-white/5 shadow-none"
          }`}
      >
        <div
          ref={navBarRef}
          className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between"
        >
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
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
                Masjid
              </span>
              <span className="text-base font-bold text-primary">Darussalam</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.dropdown && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.dropdown ? (
                  <>
                    <button
                      className={`${scrolled ? "text-foreground" : ""} text-sm font-medium hover:text-primary text-shadow transition-colors flex items-center gap-1`}
                    >
                      {item.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === item.label ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {openDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2, ease: MENU_EASE }}
                          className="absolute top-full left-0 mt-2 min-w-[200px] bg-white dark:bg-gray-900 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl shadow-lg overflow-hidden"
                        >
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`${scrolled ? "text-foreground" : ""} text-sm font-medium hover:text-primary text-shadow transition-colors`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <WhatsAppButton />
          </div>

          <button
            className="md:hidden p-1 rounded-lg hover:bg-white/30 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Tutup menu"
              className="fixed inset-0 z-40 md:hidden bg-black/50 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: MENU_EASE }}
              onClick={closeMenu}
            />

            <motion.div
              className="fixed inset-x-0 z-40 md:hidden flex flex-col bg-background/95 dark:bg-background/98 backdrop-blur-xl border-t border-border/40 shadow-2xl"
              style={{ top: navHeight, height: `calc(100dvh - ${navHeight}px)` }}
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4, ease: MENU_EASE }}
            >
              <nav className="flex-1 overflow-y-auto px-4 py-6">
                <ul className="flex flex-col gap-1">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.35, delay: 0.05 + index * 0.05, ease: MENU_EASE }}
                    >
                      {item.dropdown ? (
                        <div>
                          <button
                            onClick={() => setMobileExpandedItem(mobileExpandedItem === item.label ? null : item.label)}
                            className="w-full flex items-center justify-between text-base font-medium hover:text-primary hover:bg-primary/5 active:bg-primary/10 transition-colors py-3.5 px-4 rounded-xl"
                          >
                            {item.label}
                            <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpandedItem === item.label ? "rotate-180" : ""}`} />
                          </button>
                          <AnimatePresence>
                            {mobileExpandedItem === item.label && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: MENU_EASE }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 pt-1 space-y-1">
                                  {item.dropdown.map((subItem) => (
                                    <Link
                                      key={subItem.href}
                                      href={subItem.href}
                                      className="block text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 active:bg-primary/10 transition-colors py-2.5 px-4 rounded-lg"
                                      onClick={closeMenu}
                                    >
                                      {subItem.label}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className="block text-base font-medium hover:text-primary hover:bg-primary/5 active:bg-primary/10 transition-colors py-3.5 px-4 rounded-xl"
                          onClick={closeMenu}
                        >
                          {item.label}
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                className="shrink-0 p-4 pt-2 border-t border-border/40 bg-background/80 backdrop-blur-sm"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.35, delay: 0.2, ease: MENU_EASE }}
              >
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-3 bg-primary hover:bg-[#20ba58] active:bg-[#1aa34a] text-white font-semibold text-sm rounded-2xl py-3.5 shadow-lg transition-colors duration-200"
                >
                  <WhatsAppIcon className="w-5 h-5 shrink-0" />
                  Gabung Grup WhatsApp
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
