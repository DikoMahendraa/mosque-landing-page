"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type MobileNavContextValue = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const MobileNavContext = createContext<MobileNavContextValue | null>(null)

export function MobileNavProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <MobileNavContext.Provider value={{ isOpen, setIsOpen }}>{children}</MobileNavContext.Provider>
  )
}

export function useMobileNav() {
  const context = useContext(MobileNavContext)
  if (!context) {
    throw new Error("useMobileNav must be used within MobileNavProvider")
  }
  return context
}
