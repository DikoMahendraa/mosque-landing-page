"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cardVariants, viewport } from "@/lib/motion"
import { cn } from "@/lib/utils"

type MotionCardProps = React.ComponentProps<typeof Card> & {
  index?: number
}

export function MotionCard({ index = 0, className, children, ...props }: MotionCardProps) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className={cn(className)} {...props}>
        {children}
      </Card>
    </motion.div>
  )
}
