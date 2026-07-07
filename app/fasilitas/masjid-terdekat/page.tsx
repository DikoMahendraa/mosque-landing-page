/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { MapPin, Navigation as NavigationIcon, Phone, Clock, ExternalLink, Loader2, AlertCircle } from "lucide-react"
import { MotionCard } from "@/components/motion-card"
import { MotionSection } from "@/components/motion-section"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

type Mosque = {
  id: string
  name: string
  address: string
  distance?: number
  lat: number
  lon: number
  phone?: string
  opening_hours?: string
}

export default function MasjidTerdekatPage() {
  const [mosques, setMosques] = useState<Mosque[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null)
  const [, setPermissionDenied] = useState(false)

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371 // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = R * c
    return distance
  }

  // Fetch nearby mosques using Overpass API (OpenStreetMap)
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation({ lat: latitude, lon: longitude })

          try {
            // Overpass API query to find mosques within 5km radius
            const radius = 5000 // 5km in meters
            const query = `
              [out:json];
              (
                node["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${latitude},${longitude});
                way["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${latitude},${longitude});
                relation["amenity"="place_of_worship"]["religion"="muslim"](around:${radius},${latitude},${longitude});
              );
              out center;
            `

            const response = await fetch("https://overpass-api.de/api/interpreter", {
              method: "POST",
              body: query,
            })

            if (!response.ok) throw new Error("Gagal mengambil data masjid")

            const data = await response.json()

            // Process and sort mosques by distance
            const processedMosques: Mosque[] = data.elements
              .map((element: any) => {
                const lat = element.lat || element.center?.lat
                const lon = element.lon || element.center?.lon

                if (!lat || !lon) return null

                const distance = calculateDistance(latitude, longitude, lat, lon)

                return {
                  id: element.id.toString(),
                  name: element.tags?.name || "Masjid",
                  address:
                    element.tags?.["addr:full"] ||
                    element.tags?.["addr:street"] ||
                    "Alamat tidak tersedia",
                  distance,
                  lat,
                  lon,
                  phone: element.tags?.phone || element.tags?.["contact:phone"],
                  opening_hours: element.tags?.opening_hours,
                }
              })
              .filter((m: Mosque | null): m is Mosque => m !== null)
              .sort((a: { distance: number }, b: { distance: number }) => (a.distance || 0) - (b.distance || 0))
              .slice(0, 20) // Limit to 20 closest mosques

            setMosques(processedMosques)
          } catch (err) {
            console.error("Error fetching mosques:", err)
            setError("Gagal mengambil data masjid. Silakan coba lagi.")
          } finally {
            setLoading(false)
          }
        },
        (err) => {
          console.error("Geolocation error:", err)
          setError("Tidak dapat mengakses lokasi Anda. Pastikan izin lokasi telah diberikan.")
          setPermissionDenied(true)
          setLoading(false)
        }
      )
    }
  }, [])

  const openInMaps = (lat: number, lon: number, name: string) => {
    // Try to open in native maps app, fallback to Google Maps
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}&query_place_id=${encodeURIComponent(name)}`
    window.open(url, "_blank")
  }

  const getDirections = (lat: number, lon: number) => {
    if (userLocation) {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lon}&destination=${lat},${lon}`
      window.open(url, "_blank")
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Header */}
      <MotionSection
        variant="hero"
        className="pt-20 pb-10 px-4 sm:px-6 bg-gradient-to-b from-primary/80 to-background"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-1">
            Fasilitas Digital
          </p>
          <h1 className="text-3xl md:text-4xl font-bold">Masjid Terdekat</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Cari masjid terdekat dari lokasi Anda saat ini
          </p>
        </div>
      </MotionSection>

      <MotionSection className="px-4 sm:px-6 py-20">
        <div className="max-w-5xl mx-auto space-y-6">

          {loading ? (
            <MotionCard index={0} className="p-12 rounded-2xl text-center">
              <div className="space-y-3">
                <Loader2 className="w-12 h-12 mx-auto text-primary animate-spin" />
                <p className="text-muted-foreground">Mencari masjid terdekat...</p>
              </div>
            </MotionCard>
          ) : error ? (
            <MotionCard index={0} className="p-8 rounded-2xl border-destructive/50">
              <div className="text-center space-y-4">
                <AlertCircle className="w-12 h-12 mx-auto text-destructive" />
                <div>
                  <p className="text-destructive font-semibold mb-2">Tidak Dapat Mengakses Lokasi</p>
                  <p className="text-sm text-muted-foreground">{error}</p>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-muted/50 text-left">
                  <p className="text-sm font-semibold mb-2">Cara mengaktifkan:</p>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Aktifkan layanan lokasi di perangkat Anda</li>
                    <li>Berikan izin akses lokasi pada browser</li>
                    <li>Muat ulang halaman setelah memberikan izin</li>
                  </ul>
                </div>

                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                >
                  Muat Ulang Halaman
                </button>
              </div>
            </MotionCard>
          ) : (
            <>
              {/* Location Info */}
              {userLocation && (
                <MotionCard index={0} className="p-4 rounded-xl border-0 shadow-sm bg-primary/10">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-center sm:text-left flex-wrap">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="break-all">
                        Lokasi Anda: <strong>
                          {userLocation.lat.toFixed(4)}°, {userLocation.lon.toFixed(4)}°
                        </strong>
                      </span>
                    </div>
                    <span className="hidden sm:inline mx-2">•</span>
                    <span>
                      Ditemukan <strong className="text-primary">{mosques.length}</strong> masjid
                    </span>
                  </div>
                </MotionCard>
              )}

              {/* Mosques List */}
              {mosques.length === 0 ? (
                <MotionCard index={1} className="p-12 rounded-2xl text-center">
                  <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">
                    Tidak ada masjid ditemukan dalam radius 5km
                  </p>
                </MotionCard>
              ) : (
                <div className="space-y-4">
                  {mosques.map((mosque, index) => (
                    <MotionCard
                      key={mosque.id}
                      index={index + 1}
                      className="p-6 rounded-2xl border-0 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Mosque Info */}
                        <div className="flex-1">
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                              <MapPin className="w-6 h-6 text-white" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-lg mb-1">{mosque.name}</h3>

                              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                <NavigationIcon className="w-4 h-4 flex-shrink-0" />
                                <span>
                                  {mosque.distance && mosque.distance < 1
                                    ? `${(mosque.distance * 1000).toFixed(0)} meter`
                                    : `${mosque.distance?.toFixed(1)} km`}
                                </span>
                              </div>

                              <p className="text-sm text-muted-foreground mb-3">
                                {mosque.address}
                              </p>

                              {mosque.phone && (
                                <div className="flex items-center gap-2 text-sm mb-2">
                                  <Phone className="w-4 h-4 text-muted-foreground" />
                                  <a
                                    href={`tel:${mosque.phone}`}
                                    className="text-primary hover:underline"
                                  >
                                    {mosque.phone}
                                  </a>
                                </div>
                              )}

                              {mosque.opening_hours && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Clock className="w-4 h-4" />
                                  <span>{mosque.opening_hours}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex md:flex-col gap-2">
                          <button
                            onClick={() => getDirections(mosque.lat, mosque.lon)}
                            className="flex-1 md:flex-none px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                          >
                            <NavigationIcon className="w-4 h-4" />
                            Petunjuk Arah
                          </button>

                          <button
                            onClick={() => openInMaps(mosque.lat, mosque.lon, mosque.name)}
                            className="flex-1 md:flex-none px-4 py-2.5 bg-muted hover:bg-muted/80 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Buka di Maps
                          </button>
                        </div>
                      </div>
                    </MotionCard>
                  ))}
                </div>
              )}

              {/* Info Card */}
              <MotionCard
                index={mosques.length + 1}
                className="p-6 rounded-2xl border-0 shadow-sm bg-blue-50 dark:bg-blue-950"
              >
                <h3 className="font-bold mb-3 text-blue-900 dark:text-blue-300">Informasi</h3>
                <div className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
                  <p>• Data masjid diambil dari OpenStreetMap</p>
                  <p>• Radius pencarian: 5 kilometer dari lokasi Anda</p>
                  <p>• Jarak dihitung berdasarkan garis lurus (bukan jarak tempuh)</p>
                  <p>• Klik {"Petunjuk Arah"} untuk mendapatkan rute perjalanan</p>
                </div>
              </MotionCard>
            </>
          )}
        </div>
      </MotionSection>

      <Footer />
    </div>
  )
}
