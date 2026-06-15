import type { MosqueAdmin } from '@/lib/types'

export type OrgTier = 'leadership' | 'core' | 'advisor' | 'coordinator'

export type OrgMember = {
  id: string
  role: string
  name: string
  tier: OrgTier
  period?: string
  phone?: string
  email?: string
  photo?: string
}

export type OrgChartNode = {
  label: string
  target: string
}

const TIER_ORDER: Record<OrgTier, number> = {
  leadership: 0,
  core: 1,
  advisor: 2,
  coordinator: 3,
}

export function getTierFromPosition(position: string): OrgTier {
  const key = position.toLowerCase().trim()

  if (key.includes('ketua')) return 'leadership'
  if (key.includes('wakil')) return 'leadership'
  if (key.includes('sekretaris') || key.includes('bendahara')) return 'core'
  if (key.includes('penasihat')) return 'advisor'
  if (key.includes('koordinator') || key.includes('koord')) return 'coordinator'

  return 'coordinator'
}

export function formatAdminPeriod(periodStart: string, periodEnd: string): string {
  const startYear = new Date(periodStart).getFullYear()
  const endYear = new Date(periodEnd).getFullYear()
  return `${startYear} – ${endYear}`
}

export function mapAdminToOrgMember(admin: MosqueAdmin): OrgMember {
  return {
    id: admin.id,
    role: admin.position,
    name: admin.name,
    tier: getTierFromPosition(admin.position),
    period: formatAdminPeriod(admin.period_start, admin.period_end),
    phone: admin.phone || undefined,
    email: admin.email || undefined,
    photo: admin.photo || undefined,
  }
}

export function sortOrgMembers(members: OrgMember[]): OrgMember[] {
  return [...members].sort((a, b) => {
    const tierDiff = TIER_ORDER[a.tier] - TIER_ORDER[b.tier]
    if (tierDiff !== 0) return tierDiff
    return a.name.localeCompare(b.name, 'id')
  })
}

export function buildOrgChartLinks(members: OrgMember[]) {
  const leadership = members
    .filter((m) => m.tier === 'leadership')
    .map((m) => ({ label: m.role, target: `member-${m.id}` }))

  const core = members
    .filter((m) => m.tier === 'core')
    .map((m) => ({ label: m.role, target: `member-${m.id}` }))

  const advisors = members.filter((m) => m.tier === 'advisor')
  if (advisors.length > 0) {
    core.push({
      label: advisors.length === 1 ? advisors[0].role : 'Penasihat',
      target: advisors.length === 1 ? `member-${advisors[0].id}` : 'section-advisor',
    })
  }

  const coordinators = members
    .filter((m) => m.tier === 'coordinator')
    .map((m) => ({
      label: m.role.replace(/^Koordinator\s+/i, 'Koord. '),
      target: `member-${m.id}`,
    }))

  return { leadership, core, coordinators }
}

export const ORG_SECTIONS = [
  {
    tier: 'leadership' as const,
    title: 'Pimpinan Takmir',
    subtitle: 'Penanggung jawab utama pengelolaan masjid',
  },
  {
    tier: 'core' as const,
    title: 'Pengurus Inti',
    subtitle: 'Administrasi dan keuangan masjid',
  },
  {
    tier: 'advisor' as const,
    title: 'Dewan Penasihat',
    subtitle: 'Bimbingan keagamaan dan arahan strategis',
  },
  {
    tier: 'coordinator' as const,
    title: 'Koordinator Bidang',
    subtitle: 'Pelaksana program di setiap bidang kerja',
  },
]
