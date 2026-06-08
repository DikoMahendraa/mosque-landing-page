"use client"

import { useMobileNav } from "./mobile-nav-context"
import { WA_LINK, WhatsAppIcon } from "@/lib/whatsapp"

export default function WhatsAppFloatingButton() {
  const { isOpen } = useMobileNav()

  if (isOpen) return null

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 px-4 pb-4 pt-2 bg-gradient-to-t from-background/95 to-background/0 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-3">
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-3 bg-primary hover:bg-[#20ba58] active:bg-[#1aa34a] border border-white text-white font-semibold text-sm rounded-2xl py-3.5 shadow-xl transition-colors duration-200"
        >
          <WhatsAppIcon className="w-5 h-5" />
          Gabung Grup WhatsApp
        </a>
      </div>
    </div>
  )
}
