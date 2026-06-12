"use client"

import { useEffect, useState } from "react"

export function useTypingText(text: string, active = true, speedMs = 35) {
  const [displayed, setDisplayed] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!active) return

    // Reset animation state when text/input changes before starting interval
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional animation reset
    setDisplayed("")
    setIsComplete(false)
    let index = 0

    const interval = setInterval(() => {
      index += 1
      if (index <= text.length) {
        setDisplayed(text.slice(0, index))
      } else {
        setIsComplete(true)
        clearInterval(interval)
      }
    }, speedMs)

    return () => clearInterval(interval)
  }, [text, active, speedMs])

  return { displayed, isComplete }
}
