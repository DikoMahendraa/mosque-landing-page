"use client"

import { useState } from "react"
import { X, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { registerForEvent } from "@/lib/data"
import { buildEventConfirmationUrl, WhatsAppIcon } from "@/lib/whatsapp"

interface EventRegistrationModalProps {
  eventId: string
  eventTitle: string
  open: boolean
  onClose: () => void
  onSuccess?: () => void
}

const inputClassName =
  "w-full px-4 py-2.5 rounded-xl border-2 border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"

export function EventRegistrationModal({
  eventId,
  eventTitle,
  open,
  onClose,
  onSuccess,
}: EventRegistrationModalProps) {
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [age, setAge] = useState("")
  const [phone, setPhone] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!open) return null

  const resetForm = () => {
    setName("")
    setAddress("")
    setAge("")
    setPhone("")
    setError(null)
    setSuccess(false)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const trimmedName = name.trim()
    const trimmedAddress = address.trim()
    const parsedAge = parseInt(age, 10)

    if (!trimmedName) {
      setError("Nama wajib diisi.")
      return
    }
    if (!trimmedAddress) {
      setError("Alamat wajib diisi.")
      return
    }
    if (!age || isNaN(parsedAge) || parsedAge < 1 || parsedAge > 149) {
      setError("Umur wajib diisi dengan angka yang valid.")
      return
    }

    setSubmitting(true)
    try {
      await registerForEvent({
        event_id: eventId,
        name: trimmedName,
        address: trimmedAddress,
        age: parsedAge,
        phone: phone.trim() || undefined,
      })
      setSuccess(true)
      onSuccess?.()
    } catch {
      setError("Gagal mendaftar. Silakan coba lagi.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleConfirmToAdmin = () => {
    const url = buildEventConfirmationUrl({
      eventTitle,
      name: name.trim(),
      address: address.trim(),
      age: parseInt(age, 10),
      phone: phone.trim() || undefined,
    })
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        className="bg-background rounded-2xl p-6 max-w-md w-full shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold">Daftar Acara</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{eventTitle}</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="text-center py-6 space-y-4">
            <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto" />
            <div>
              <p className="text-lg font-semibold">Pendaftaran Berhasil!</p>
              <p className="text-sm text-muted-foreground mt-2">
                Terima kasih, {name}. Pendaftaran Anda untuk acara ini telah tercatat.
              </p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={handleConfirmToAdmin}
                className="w-full rounded-xl bg-green-600 hover:bg-green-700 text-white gap-2"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Konfirmasi ke Admin
              </Button>
              <Button variant="outline" onClick={handleClose} className="w-full rounded-xl">
                Tutup
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="reg-name" className="block text-sm font-medium mb-1.5">
                Nama <span className="text-destructive">*</span>
              </label>
              <input
                id="reg-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama lengkap"
                className={inputClassName}
                disabled={submitting}
                autoComplete="name"
              />
            </div>

            <div>
              <label htmlFor="reg-address" className="block text-sm font-medium mb-1.5">
                Alamat <span className="text-destructive">*</span>
              </label>
              <textarea
                id="reg-address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Alamat lengkap"
                rows={2}
                className={`${inputClassName} resize-none`}
                disabled={submitting}
              />
            </div>

            <div>
              <label htmlFor="reg-age" className="block text-sm font-medium mb-1.5">
                Umur <span className="text-destructive">*</span>
              </label>
              <input
                id="reg-age"
                type="number"
                min={1}
                max={149}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Contoh: 25"
                className={inputClassName}
                disabled={submitting}
              />
            </div>

            <div>
              <label htmlFor="reg-phone" className="block text-sm font-medium mb-1.5">
                No. WhatsApp <span className="text-muted-foreground font-normal">(opsional)</span>
              </label>
              <input
                id="reg-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Contoh: 081234567890"
                className={inputClassName}
                disabled={submitting}
                autoComplete="tel"
              />
            </div>

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1 rounded-xl"
                disabled={submitting}
              >
                Batal
              </Button>
              <Button type="submit" className="flex-1 rounded-xl" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  "Daftar"
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
