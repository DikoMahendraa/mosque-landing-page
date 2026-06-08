/** Lokasi masjid — dari https://maps.app.goo.gl/LgqXrWptPgyP7chs8 */
export const MOSQUE_LOCATION = {
  name: "Masjid Darussalam",
  address: "V75W+H73, Bandar Lampung, Lampung",
  latitude: -5.1411618,
  longitude: 105.2957633,
} as const

/** Tautan Google Maps resmi */
export const MOSQUE_MAPS_LINK = "https://maps.app.goo.gl/LgqXrWptPgyP7chs8"

/** Preview embed peta (pin sesuai koordinat di atas) */
export const MOSQUE_MAPS_EMBED_URL = `https://maps.google.com/maps?q=${MOSQUE_LOCATION.latitude},${MOSQUE_LOCATION.longitude}&hl=id&z=17&output=embed`
