"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, Calendar, Users, type LucideIcon } from "lucide-react"
import { MotionCard } from "@/components/motion-card"
import { MotionSection } from "@/components/motion-section"
import { MosqueStats } from "@/lib/types"

type StatItem = {
  key: keyof Pick<MosqueStats, "monthly_events" | "community_members" | "study_sessions">
  label: string
  subtitle: string
  href: string
  linkLabel: string
  icon: LucideIcon
  iconBg: string
  iconColor: string
  valueColor: string
}

const STAT_ITEMS: StatItem[] = [
  {
    key: "monthly_events",
    label: "Acara Bulanan",
    subtitle: "Kajian, olahraga & kegiatan komunitas setiap bulan",
    href: "/events",
    linkLabel: "Lihat acara",
    icon: Calendar,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    valueColor: "text-primary",
  },
  {
    key: "community_members",
    label: "Anggota Komunitas",
    subtitle: "Jamaah aktif yang terhubung dan berkembang bersama",
    href: "/activity",
    linkLabel: "Aktivitas harian",
    icon: Users,
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    valueColor: "text-accent",
  },
  {
    key: "study_sessions",
    label: "Sesi Kajian",
    subtitle: "Program pembelajaran Islam terstruktur untuk semua level",
    href: "/kajian",
    linkLabel: "Jelajahi kajian",
    icon: BookOpen,
    iconBg: "bg-secondary/20",
    iconColor: "text-secondary",
    valueColor: "text-secondary",
  },
]

type CommunityStatsProps = {
  stats: MosqueStats
}

export default function CommunityStats({ stats }: CommunityStatsProps) {
  return (
    <MotionSection className="py-16 px-4 sm:px-6 bg-primary">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-2">
            Dampak Komunitas
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Komunitas Kami dalam Angka</h2>
          <p className="text-white/80 mt-2 max-w-2xl mx-auto md:mx-0 leading-relaxed">
            Setiap angka mewakili jamaah, kajian, dan kegiatan yang kita jalankan bersama di Masjid
            Darussalam.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {STAT_ITEMS.map((item, index) => {
            const Icon = item.icon
            const value = stats[item.key]

            return (
              <Link key={item.key} href={item.href} className="group block h-full">
                <MotionCard
                  index={index}
                  className="p-5 sm:p-6 bg-background border-0 shadow-sm hover:shadow-md transition-shadow rounded-2xl h-full"
                >
                  <div className="flex gap-4 items-start">
                    <div
                      className={`shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl ${item.iconBg}`}
                    >
                      <Icon className={`w-6 h-6 ${item.iconColor}`} />
                    </div>

                    <div className="flex-1 min-w-0 text-left">
                      <div className={`text-3xl font-bold ${item.valueColor} mb-0.5`}>{value}+</div>
                      <p className="font-semibold text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.subtitle}</p>
                      <span
                        className={`inline-flex items-center gap-1 text-sm font-medium mt-3 ${item.iconColor} group-hover:gap-2 transition-all`}
                      >
                        {item.linkLabel}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </MotionCard>
              </Link>
            )
          })}
        </div>
      </div>
    </MotionSection>
  )
}
