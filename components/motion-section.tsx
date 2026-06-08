"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { heroVariants, sectionVariants, viewport } from "@/lib/motion"

type MotionSectionProps = React.ComponentProps<"section"> & {
  delay?: number
  variant?: "scroll" | "hero"
}

export function MotionSection({
  className,
  children,
  delay = 0,
  variant = "scroll",
  ...props
}: MotionSectionProps) {
  const variants = variant === "hero" ? heroVariants : sectionVariants

  return (
    <motion.section
      className={cn(className)}
      initial="hidden"
      whileInView={variant === "scroll" ? "visible" : undefined}
      animate={variant === "hero" ? "visible" : undefined}
      viewport={variant === "scroll" ? viewport : undefined}
      variants={variants}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.section>
  )
}
