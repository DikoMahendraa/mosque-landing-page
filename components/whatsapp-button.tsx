"use client"

import { WA_LINK, WhatsAppIcon } from "@/lib/whatsapp"

export default function WhatsAppButton() {
  return (
    <div className="hidden md:flex flex-col items-end gap-0">
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-primary hover:bg-[#20ba58] text-white font-semibold text-sm shadow-lg pl-4 pr-5 py-3 rounded-full translate-x-0 hover:-translate-x-1 transition-all duration-300"
      >
        <WhatsAppIcon className="w-5 h-5 shrink-0" />
        <span className="text-sm font-bold">Bergabung Grup</span>
      </a>
    </div>
  )
}
