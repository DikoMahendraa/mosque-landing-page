"use client"

import Link from "next/link"
import {
  ArrowLeft,
  Briefcase,
  Crown,
  GraduationCap,
  HandHeart,
  Megaphone,
  Scale,
  UserCircle,
  Users,
  Wallet,
  Wrench,
} from "lucide-react"
import { MotionCard } from "@/components/motion-card"
import { MotionSection } from "@/components/motion-section"
import {
  MOSQUE_ORGANIZATION,
  ORG_CHART_LINKS,
  ORG_SECTIONS,
  type OrgMember,
} from "@/lib/mosque-organization"

function scrollToTarget(targetId: string) {
  document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

type OrgChartButtonProps = {
  label: string
  targetId: string
  className: string
}

function OrgChartButton({ label, targetId, className }: OrgChartButtonProps) {
  return (
    <button
      type="button"
      onClick={() => scrollToTarget(targetId)}
      className={`cursor-pointer transition-all duration-200 hover:scale-[1.03] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${className}`}
      aria-label={`Lihat ${label}`}
    >
      {label}
    </button>
  )
}

const ROLE_ICONS: Record<string, typeof Crown> = {
  "Ketua Takmir": Crown,
  "Wakil Ketua Takmir": Users,
  Sekretaris: Briefcase,
  Bendahara: Wallet,
  Penasihat: Scale,
  "Koordinator Kajian": GraduationCap,
  "Koordinator Pemuda": Users,
  "Koordinator Sosial": HandHeart,
  "Koordinator Sarana": Wrench,
  "Koordinator Humas": Megaphone,
}

const TIER_STYLES: Record<OrgMember["tier"], { badge: string; icon: string; ring: string }> = {
  leadership: {
    badge: "bg-primary/10 text-primary",
    icon: "bg-primary text-primary-foreground",
    ring: "ring-primary/20",
  },
  core: {
    badge: "bg-accent/10 text-accent",
    icon: "bg-accent text-accent-foreground",
    ring: "ring-accent/20",
  },
  advisor: {
    badge: "bg-secondary/20 text-secondary-foreground",
    icon: "bg-secondary text-secondary-foreground",
    ring: "ring-secondary/30",
  },
  coordinator: {
    badge: "bg-muted text-muted-foreground",
    icon: "bg-primary/80 text-primary-foreground",
    ring: "ring-border",
  },
}

function OrgMemberCard({ member, index }: { member: OrgMember; index: number }) {
  const Icon = ROLE_ICONS[member.role] ?? UserCircle
  const styles = TIER_STYLES[member.tier]

  return (
    <div id={`member-${member.id}`} className="scroll-mt-24 h-full">
    <MotionCard
      index={index}
      className={`p-5 sm:p-6 bg-background border-0 shadow-sm hover:shadow-md transition-shadow rounded-2xl h-full ring-1 ${styles.ring}`}
    >
      <div className="flex items-start gap-4">
        <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${styles.icon}`}>
          <Icon className="w-6 h-6" />
        </div>

        <div className="flex-1 min-w-0">
          <span className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-lg mb-2 ${styles.badge}`}>
            {member.role}
          </span>
          <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
          {member.period && (
            <p className="text-xs text-muted-foreground mt-0.5">Masa bakti {member.period}</p>
          )}
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{member.description}</p>
        </div>
      </div>
    </MotionCard>
    </div>
  )
}

export default function MosqueOrganization() {
  return (
    <main className="min-h-screen bg-background">
      <MotionSection
        variant="hero"
        className="bg-gradient-to-br from-primary/10 to-secondary/10 border-b border-border/40 py-12 sm:py-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Kembali ke Beranda</span>
          </Link>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary/70 mb-2">
            Pengurus Masjid
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Struktur Organisasi</h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Susunan pengurus takmir Masjid Darussalam yang mengelola ibadah, program jamaah, dan
            pengembangan komunitas secara berkelanjutan.
          </p>
        </div>
      </MotionSection>

      {/* Org overview diagram */}
      <MotionSection className="py-12 sm:py-16 border-b border-border/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-bold text-center mb-8">Bagan Struktur</h2>
          <p className="text-sm text-muted-foreground text-center mb-6">
            Klik posisi di bawah untuk melihat pengurus terkait
          </p>
          <div className="flex flex-col items-center gap-4">
            {ORG_CHART_LINKS.leadership.map((node, i) => (
              <div key={node.target} className="flex flex-col items-center gap-4 w-full">
                {i > 0 && <div className="w-px h-6 bg-border" />}
                <OrgChartButton
                  label={node.label}
                  targetId={node.target}
                  className={`px-6 py-3 rounded-xl font-semibold text-sm sm:text-base text-center shadow-sm w-full max-w-xs ${
                    i === 0
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/80 text-primary-foreground"
                  }`}
                />
              </div>
            ))}

            <div className="w-px h-6 bg-border" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl">
              {ORG_CHART_LINKS.core.map((node) => (
                <OrgChartButton
                  key={node.target}
                  label={node.label}
                  targetId={node.target}
                  className="px-4 py-2.5 rounded-xl bg-accent/15 border border-accent/20 text-accent font-medium text-sm text-center"
                />
              ))}
            </div>

            <div className="w-px h-6 bg-border" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 w-full">
              {ORG_CHART_LINKS.coordinators.map((node) => (
                <OrgChartButton
                  key={node.target}
                  label={node.label}
                  targetId={node.target}
                  className="px-3 py-2 rounded-lg bg-muted text-muted-foreground font-medium text-xs sm:text-sm text-center hover:bg-muted/80"
                />
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Member cards by section */}
      {ORG_SECTIONS.map((section) => {
        const members = MOSQUE_ORGANIZATION.filter((m) => m.tier === section.tier)
        if (members.length === 0) return null

        return (
          <MotionSection
            key={section.tier}
            id={`section-${section.tier}`}
            className="py-12 sm:py-16 even:bg-muted/30 scroll-mt-24"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{section.title}</h2>
                <p className="text-muted-foreground mt-1">{section.subtitle}</p>
              </div>

              <div
                className={`grid gap-5 ${
                  section.tier === "leadership"
                    ? "md:grid-cols-2"
                    : section.tier === "advisor"
                      ? "md:grid-cols-2"
                      : "sm:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {members.map((member, index) => (
                  <OrgMemberCard key={member.id} member={member} index={index} />
                ))}
              </div>
            </div>
          </MotionSection>
        )
      })}

      <MotionSection className="py-12 border-t border-border/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Data pengurus di atas bersifat sementara untuk pengembangan. Informasi resmi akan
            diperbarui melalui dashboard Supabase setelah integrasi selesai.
          </p>
        </div>
      </MotionSection>
    </main>
  )
}
