/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect, useRef } from "react"
import { Compass, MapPin, Navigation as NavigationIcon, AlertCircle, Loader2 } from "lucide-react"
import { MotionCard } from "@/components/motion-card"
import { MotionSection } from "@/components/motion-section"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const KAABA_COORDS = {
  latitude: 21.4225,
  longitude: 39.8262,
}

export default function ArahKiblatPage() {
  const [heading, setHeading] = useState<number | null>(null)
  const [qiblaDirection, setQiblaDirection] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null)
  const [permissionDenied, setPermissionDenied] = useState(false)
  const compassRef = useRef<HTMLDivElement>(null)

  // Calculate Qibla direction from user location to Kaaba
  const calculateQiblaDirection = (lat: number, lon: number): number => {
    const toRad = (deg: number) => (deg * Math.PI) / 180
    const toDeg = (rad: number) => (rad * 180) / Math.PI

    const lat1 = toRad(lat)
    const lon1 = toRad(lon)
    const lat2 = toRad(KAABA_COORDS.latitude)
    const lon2 = toRad(KAABA_COORDS.longitude)

    const dLon = lon2 - lon1

    const y = Math.sin(dLon) * Math.cos(lat2)
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon)

    let brng = toDeg(Math.atan2(y, x))
    brng = (brng + 360) % 360

    return brng
  }

  // Get user location
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setLocation({ lat: latitude, lon: longitude })
          const qibla = calculateQiblaDirection(latitude, longitude)
          setQiblaDirection(qibla)
          setLoading(false)
        },
        (err) => {
          console.error("Geolocation error:", err)
          setError("Tidak dapat mengakses lokasi Anda. Pastikan izin lokasi telah diberikan.")
          setPermissionDenied(true)
          setLoading(false)
        }
      )
    } else {
      setTimeout(() => {
        setError("Browser Anda tidak mendukung geolocation.")
        setLoading(false)
      }, 0)
    }
  }, [])

  // Get device orientation (compass)
  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      let heading: number | null = null

      // @ts-expect-error - webkitCompassHeading is not defined in DeviceOrientationEvent
      if (event.webkitCompassHeading !== undefined) {
        // iOS
        // @ts-expect-error - webkitCompassHeading is not defined in DeviceOrientationEvent
        heading = event.webkitCompassHeading
      } else if (event.alpha !== null) {
        // Android
        heading = 360 - event.alpha
      }

      if (heading !== null) {
        setHeading(heading)
      }
    }

    // Request permission for iOS 13+
    const requestPermission = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission()
          if (permission === "granted") {
            window.addEventListener("deviceorientation", handleOrientation, true)
          } else {
            setError("Izin kompas ditolak. Berikan izin untuk menggunakan fitur ini.")
          }
        } catch (err) {
          console.error("Permission error:", err)
          setError("Tidak dapat mengakses sensor kompas.")
        }
      } else {
        // Non-iOS 13+ devices
        window.addEventListener("deviceorientation", handleOrientation, true)
      }
    }

    if (!permissionDenied) {
      requestPermission()
    }

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation, true)
    }
  }, [permissionDenied])

  const getRelativeAngle = () => {
    if (heading === null || qiblaDirection === null) return 0
    let angle = qiblaDirection - heading
    // Normalize to -180 to 180
    while (angle > 180) angle -= 360
    while (angle < -180) angle += 360
    return angle
  }

  const relativeAngle = getRelativeAngle()
  const isAligned = Math.abs(relativeAngle) < 5 // Within 5 degrees

  const requestCompassPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission()
        if (permission === "granted") {
          window.location.reload()
        }
      } catch (err) {
        console.error("Permission error:", err)
      }
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
          <h1 className="text-3xl md:text-4xl font-bold">Arah Kiblat</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Temukan arah kiblat yang akurat dari lokasi Anda
          </p>
        </div>
      </MotionSection>

      <MotionSection className="px-4 sm:px-6 py-20">
        <div className="max-w-5xl mx-auto space-y-6">

          {loading ? (
            <MotionCard index={0} className="p-12 rounded-2xl text-center">
              <div className="space-y-3">
                <Loader2 className="w-12 h-12 mx-auto text-primary animate-spin" />
                <p className="text-muted-foreground">Mengambil lokasi Anda...</p>
              </div>
            </MotionCard>
          ) : error ? (
            <MotionCard index={0} className="p-8 rounded-2xl border-destructive/50">
              <div className="text-center space-y-4">
                <AlertCircle className="w-12 h-12 mx-auto text-destructive" />
                <div>
                  <p className="text-destructive font-semibold mb-2">Tidak Dapat Mengakses Sensor</p>
                  <p className="text-sm text-muted-foreground">{error}</p>
                </div>

                {typeof (DeviceOrientationEvent as any).requestPermission === "function" && (
                  <button
                    onClick={requestCompassPermission}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Izinkan Akses Kompas
                  </button>
                )}

                <div className="mt-6 p-4 rounded-xl bg-muted/50 text-left">
                  <p className="text-sm font-semibold mb-2">Cara mengaktifkan:</p>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Pastikan lokasi & sensor gerak diaktifkan</li>
                    <li>Berikan izin lokasi pada browser</li>
                    <li>Untuk iOS: Berikan izin Motion & Orientation</li>
                    <li>Kalibrasi kompas dengan gerakan angka 8</li>
                  </ul>
                </div>
              </div>
            </MotionCard>
          ) : (
            <>
              {/* Location Info */}
              {location && (
                <MotionCard index={0} className="p-4 rounded-xl border-0 shadow-sm bg-muted/50">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2 text-sm text-muted-foreground text-center sm:text-left">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="break-all">
                      Lokasi: <strong className="text-foreground">
                        {location.lat.toFixed(4)}°, {location.lon.toFixed(4)}°
                      </strong>
                    </span>
                    {qiblaDirection !== null && (
                      <>
                        <span className="hidden sm:inline mx-2">•</span>
                        <span>
                          Kiblat: <strong className="text-foreground">{qiblaDirection.toFixed(1)}°</strong>
                        </span>
                      </>
                    )}
                  </div>
                </MotionCard>
              )}

              {/* Compass Card */}
              <MotionCard
                index={1}
                className={`p-8 rounded-2xl border-0 shadow-lg transition-all duration-300 ${isAligned
                  ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white"
                  : "bg-gradient-to-br from-primary/10 to-primary/5"
                  }`}
              >
                <div className="flex flex-col items-center justify-center space-y-6">
                  {/* Compass */}
                  <div className="relative w-64 h-64 md:w-80 md:h-80">
                    {/* Outer ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-primary/20" />

                    {/* Compass body */}
                    <div
                      ref={compassRef}
                      className="absolute inset-4 rounded-full bg-white dark:bg-gray-900 shadow-2xl flex items-center justify-center transition-transform duration-300 ease-out"
                      style={{
                        transform: heading !== null ? `rotate(${-heading}deg)` : "rotate(0deg)",
                      }}
                    >
                      {/* Cardinal directions */}
                      <div className="absolute inset-0">
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 font-bold text-red-500">N</div>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-bold text-gray-400">S</div>
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">W</div>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">E</div>
                      </div>

                      {/* Center dot */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-primary" />
                      </div>

                      {/* Qibla arrow (static, points to qibla) */}
                      <div
                        className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
                        style={{
                          transform: qiblaDirection !== null ? `rotate(${qiblaDirection}deg)` : "rotate(0deg)",
                        }}
                      >
                        <div className="flex flex-col items-center">
                          <NavigationIcon
                            className={`w-16 h-16 transition-colors duration-300 ${isAligned ? "text-emerald-500" : "text-primary"
                              }`}
                            fill="currentColor"
                          />
                          <div className={`mt-2 text-xs font-bold ${isAligned ? "text-emerald-600" : "text-primary"
                            }`}>
                            KIBLAT
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  {heading !== null ? (
                    <div className="text-center space-y-2">
                      {isAligned ? (
                        <>
                          <p className="text-2xl font-bold animate-pulse">
                            ✓ Arah Kiblat Tepat!
                          </p>
                          <p className="text-sm opacity-90">
                            Perangkat Anda mengarah ke kiblat
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="text-xl font-bold">
                            Putar {Math.abs(relativeAngle).toFixed(0)}° ke {relativeAngle > 0 ? "kanan" : "kiri"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Heading: {heading.toFixed(0)}°
                          </p>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="text-center">
                      <Compass className="w-8 h-8 mx-auto mb-2 text-muted-foreground animate-spin" />
                      <p className="text-sm text-muted-foreground">
                        Menunggu sensor kompas...
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Gerakkan perangkat Anda untuk kalibrasi
                      </p>
                    </div>
                  )}
                </div>
              </MotionCard>

              {/* Instructions */}
              <MotionCard index={2} className="p-6 rounded-2xl border-0 shadow-sm bg-blue-50 dark:bg-blue-950">
                <h3 className="font-bold mb-3 text-blue-900 dark:text-blue-300 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Cara Menggunakan
                </h3>
                <div className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
                  <p>1. Pastikan perangkat Anda memiliki sensor kompas (magnetometer)</p>
                  <p>2. Kalibrasi kompas dengan menggerakkan perangkat membentuk angka 8</p>
                  <p>3. Letakkan perangkat dalam posisi horizontal</p>
                  <p>4. Putar badan Anda mengikuti petunjuk hingga tanda kiblat mengarah ke atas</p>
                  <p>5. Jauhkan dari benda logam atau medan magnet yang dapat mengganggu akurasi</p>
                </div>
              </MotionCard>

              {/* Kaaba Info */}
              <MotionCard index={3} className="p-6 rounded-2xl border-0 shadow-sm">
                <h3 className="font-bold mb-3">Tentang {`Ka'bah`}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Lokasi:</strong> Masjidil Haram, Mekkah, Arab Saudi
                  </p>
                  <p>
                    <strong className="text-foreground">Koordinat:</strong> {KAABA_COORDS.latitude}° N, {KAABA_COORDS.longitude}° E
                  </p>
                  <p>
                    Arah kiblat dihitung menggunakan formula Great Circle yang mempertimbangkan kelengkungan bumi untuk hasil yang akurat.
                  </p>
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
