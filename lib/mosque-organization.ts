export type OrgTier = "leadership" | "core" | "advisor" | "coordinator"

export type OrgMember = {
  id: string
  role: string
  name: string
  tier: OrgTier
  description: string
  period?: string
}

/** Dummy data — replace with Supabase when dashboard is ready */
export const MOSQUE_ORGANIZATION: OrgMember[] = [
  {
    id: "ketua",
    role: "Ketua Takmir",
    name: "Bpk. Ahmad Rizaldi",
    tier: "leadership",
    description: "Memimpin arah strategis pengelolaan masjid dan koordinasi seluruh bidang kerja.",
    period: "2024 – 2027",
  },
  {
    id: "wakil",
    role: "Wakil Ketua Takmir",
    name: "Bpk. Muhammad Fauzan",
    tier: "leadership",
    description: "Membantu ketua takmir dan mengkoordinasikan program operasional harian masjid.",
    period: "2024 – 2027",
  },
  {
    id: "sekretaris",
    role: "Sekretaris",
    name: "Bpk. Hendra Wijaya",
    tier: "core",
    description: "Mengurus administrasi, notulensi rapat, dokumentasi keputusan, dan korespondensi masjid.",
    period: "2024 – 2027",
  },
  {
    id: "bendahara",
    role: "Bendahara",
    name: "Bpk. Irfan Hakim",
    tier: "core",
    description: "Mengelola keuangan masjid, laporan pemasukan-pengeluaran, dan pertanggungjawaban kas.",
    period: "2024 – 2027",
  },
  {
    id: "penasihat-1",
    role: "Penasihat",
    name: "Ust. Dr. Abdullah Rahman",
    tier: "advisor",
    description: "Memberikan arahan keagamaan dan nasihat strategis kepada pengurus masjid.",
  },
  {
    id: "penasihat-2",
    role: "Penasihat",
    name: "Ust. Yusuf Al-Mansur",
    tier: "advisor",
    description: "Membimbing program kajian dan memastikan kegiatan sesuai nilai-nilai Islam.",
  },
  {
    id: "kajian",
    role: "Koordinator Kajian",
    name: "Bpk. Rizki Pratama",
    tier: "coordinator",
    description: "Merencanakan dan menjalankan kajian rutin, pengajian, dan program pendidikan Islam.",
  },
  {
    id: "pemuda",
    role: "Koordinator Pemuda",
    name: "Bpk. Dimas Aditya",
    tier: "coordinator",
    description: "Mengembangkan kegiatan remaja dan pemuda untuk memperkuat ukhuwah dan keterampilan.",
  },
  {
    id: "sosial",
    role: "Koordinator Sosial",
    name: "Ibu Siti Aminah",
    tier: "coordinator",
    description: "Mengorganisir program sosial, bantuan jamaah, dan kegiatan kepedulian komunitas.",
  },
  {
    id: "sarana",
    role: "Koordinator Sarana",
    name: "Bpk. Agus Santoso",
    tier: "coordinator",
    description: "Menjaga kebersihan, perawatan fasilitas, dan kenyamanan lingkungan masjid.",
  },
  {
    id: "humas",
    role: "Koordinator Humas",
    name: "Ibu Dewi Lestari",
    tier: "coordinator",
    description: "Mengelola komunikasi publik, dokumentasi kegiatan, dan hubungan dengan jamaah.",
  },
]

/** Scroll targets for the org chart diagram (member id or section tier) */
export const ORG_CHART_LINKS = {
  leadership: [
    { label: "Ketua Takmir", target: "member-ketua" },
    { label: "Wakil Ketua Takmir", target: "member-wakil" },
  ],
  core: [
    { label: "Sekretaris", target: "member-sekretaris" },
    { label: "Bendahara", target: "member-bendahara" },
    { label: "Penasihat", target: "section-advisor" },
  ],
  coordinators: [
    { label: "Koord. Kajian", target: "member-kajian" },
    { label: "Koord. Pemuda", target: "member-pemuda" },
    { label: "Koord. Sosial", target: "member-sosial" },
    { label: "Koord. Sarana", target: "member-sarana" },
    { label: "Koord. Humas", target: "member-humas" },
  ],
} as const

export const ORG_SECTIONS = [
  {
    tier: "leadership" as const,
    title: "Pimpinan Takmir",
    subtitle: "Penanggung jawab utama pengelolaan masjid",
  },
  {
    tier: "core" as const,
    title: "Pengurus Inti",
    subtitle: "Administrasi dan keuangan masjid",
  },
  {
    tier: "advisor" as const,
    title: "Dewan Penasihat",
    subtitle: "Bimbingan keagamaan dan arahan strategis",
  },
  {
    tier: "coordinator" as const,
    title: "Koordinator Bidang",
    subtitle: "Pelaksana program di setiap bidang kerja",
  },
]
