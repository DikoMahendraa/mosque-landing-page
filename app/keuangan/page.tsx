"use client"

import { useState, useMemo, useEffect } from "react"
import { TrendingUp, TrendingDown, Wallet, CalendarDays, X } from "lucide-react"
import { MotionCard } from "@/components/motion-card"
import { MotionSection } from "@/components/motion-section"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { getTransactions } from "@/lib/data"
import { Transaction } from "@/lib/types"

type Filter = "all" | "income" | "expense"

// ── helpers ───────────────────────────────────────────────────────────────────
function formatRp(amount: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount)
}
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function KeuanganPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<Filter>("all")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  const hasDateFilter = dateFrom || dateTo

  function clearDates() { setDateFrom(""); setDateTo("") }

  // Fetch transactions from Supabase
  useEffect(() => {
    getTransactions()
      .then((data) => setTransactions(data || []))
      .catch((err) => {
        console.error("Failed to fetch transactions:", err)
        setTransactions([])
      })
      .finally(() => setLoading(false))
  }, [])

  // Calculate date bounds from actual data
  const { minDate, maxDate } = useMemo(() => {
    if (transactions.length === 0) {
      const today = new Date().toISOString().split('T')[0]
      return { minDate: today, maxDate: today }
    }
    const dates = transactions.map(t => t.date).sort()
    return { minDate: dates[0], maxDate: dates[dates.length - 1] }
  }, [transactions])

  const filtered = useMemo(() => {
    return transactions.filter(t => {
      if (filter !== "all" && t.type !== filter) return false
      if (dateFrom && t.date < dateFrom) return false
      if (dateTo && t.date > dateTo) return false
      return true
    })
  }, [transactions, filter, dateFrom, dateTo])

  const totalIn = useMemo(() => filtered.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0), [filtered])
  const totalOut = useMemo(() => filtered.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0), [filtered])
  const balance = totalIn - totalOut

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Header */}
      <MotionSection variant="hero" className="pt-20 pb-10 px-4 sm:px-6 bg-gradient-to-b from-primary/80 to-background">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">Transparansi Keuangan</p>
          <h1 className="text-3xl md:text-4xl font-bold">Kas Masjid</h1>
          <p className="text-muted-foreground mt-1 text-sm">Laporan pemasukan & pengeluaran kas Masjid Darussalam</p>
        </div>
      </MotionSection>

      <MotionSection className="px-4 sm:px-6 pb-20">
        <div className="max-w-5xl mx-auto space-y-6">

          {/* Summary Cards — reactive to filters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MotionCard index={0} className="p-6 rounded-2xl border-0 shadow-sm bg-primary text-primary-foreground">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium opacity-80">Saldo</span>
                <Wallet className="w-5 h-5 opacity-70" />
              </div>
              <p className="text-2xl font-bold">{formatRp(balance)}</p>
              <p className="text-xs opacity-70 mt-1">{filtered.length} transaksi</p>
            </MotionCard>

            <MotionCard index={1} className="p-6 rounded-2xl border-0 shadow-sm bg-emerald-50 dark:bg-emerald-950">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Total Pemasukan</span>
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
              <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{formatRp(totalIn)}</p>
              <p className="text-xs text-emerald-600/70 mt-1">{filtered.filter(t => t.type === "income").length} transaksi masuk</p>
            </MotionCard>

            <MotionCard index={2} className="p-6 rounded-2xl border-0 shadow-sm bg-red-50 dark:bg-red-950">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-red-700 dark:text-red-400">Total Pengeluaran</span>
                <TrendingDown className="w-5 h-5 text-red-500" />
              </div>
              <p className="text-2xl font-bold text-red-700 dark:text-red-400">{formatRp(totalOut)}</p>
              <p className="text-xs text-red-600/70 mt-1">{filtered.filter(t => t.type === "expense").length} transaksi keluar</p>
            </MotionCard>
          </div>

          {/* Filters row */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            {/* Type tabs */}
            <div className="flex gap-2 flex-shrink-0">
              {(["all", "income", "expense"] as Filter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${filter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                >
                  {f === "all" ? "Semua" : f === "income" ? "Pemasukan" : "Pengeluaran"}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-6 bg-border" />

            {/* Date range */}
            <div className="flex items-center gap-2 flex-wrap">
              <CalendarDays className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <input
                type="date"
                value={dateFrom}
                min={minDate}
                max={dateTo || maxDate}
                onChange={e => setDateFrom(e.target.value)}
                className="rounded-xl border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 w-36"
                placeholder="Dari tanggal"
              />
              <span className="text-muted-foreground text-sm">—</span>
              <input
                type="date"
                value={dateTo}
                min={dateFrom || minDate}
                max={maxDate}
                onChange={e => setDateTo(e.target.value)}
                className="rounded-xl border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 w-36"
                placeholder="Sampai tanggal"
              />
              {hasDateFilter && (
                <button
                  onClick={clearDates}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors px-2 py-1.5 rounded-lg hover:bg-muted"
                >
                  <X className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Result info */}
          {(hasDateFilter || filter !== "all") && (
            <p className="text-xs text-muted-foreground -mt-2">
              Menampilkan <span className="font-semibold text-foreground">{filtered.length}</span> transaksi
              {hasDateFilter && <> dari <span className="font-semibold text-foreground">{dateFrom ? formatDate(dateFrom) : "awal"}</span> sampai <span className="font-semibold text-foreground">{dateTo ? formatDate(dateTo) : "sekarang"}</span></>}
            </p>
          )}

          {/* Transaction List */}
          <MotionCard index={0} className="rounded-2xl border-0 shadow-sm overflow-hidden">
            {loading ? (
              <div className="py-16 text-center text-muted-foreground text-sm">
                Memuat data transaksi...
              </div>
            ) : (
              <>
                {/* Desktop header */}
                <div className="hidden sm:grid grid-cols-[auto_1fr_auto_auto] gap-4 px-6 py-3 bg-muted/50 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <div />
                  <div>Keterangan</div>
                  <div className="text-right">Tanggal</div>
                  <div className="text-right">Nominal</div>
                </div>

                {filtered.length === 0 ? (
                  <div className="py-16 text-center text-muted-foreground text-sm">
                    Tidak ada transaksi dalam rentang tanggal ini.
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {filtered.map((t) => (
                      <div
                        key={t.id}
                        className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto_auto] gap-x-4 items-center px-6 py-4"
                      >
                        {/* Icon */}
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${t.type === "income" ? "bg-emerald-100 dark:bg-emerald-900" : "bg-red-100 dark:bg-red-900"
                          }`}>
                          {t.type === "income"
                            ? <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            : <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                          }
                        </div>

                        {/* Description */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-sm">{t.description}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${t.type === "income"
                              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-400"
                              }`}>
                              {t.category}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            <span className="sm:hidden">{formatDate(t.date)} · </span>
                            Dicatat oleh {t.recorded_by}
                          </p>
                          {/* Mobile amount */}
                          <p className={`sm:hidden font-bold text-sm mt-1 ${t.type === "income" ? "text-emerald-600" : "text-red-600"
                            }`}>
                            {t.type === "income" ? "+" : "−"}{formatRp(t.amount)}
                          </p>
                        </div>

                        {/* Date — desktop */}
                        <div className="hidden sm:block text-right text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(t.date)}
                        </div>

                        {/* Amount — desktop */}
                        <div className={`hidden sm:block text-right font-bold text-sm whitespace-nowrap ${t.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                          }`}>
                          {t.type === "income" ? "+" : "−"}{formatRp(t.amount)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </MotionCard>

        </div>
      </MotionSection>

      <Footer />
    </div>
  )
}
