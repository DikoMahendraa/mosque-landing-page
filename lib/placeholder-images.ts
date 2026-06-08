/** Temporary dev placeholders until event images come from Supabase dashboard */
export const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1666162174905-73f3206be09a?q=80&w=2230&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1600&q=80",
  "https://images.unsplash.com/photo-1712249238100-f5bdb874e5d0?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1596125160970-6f02eeba00d3?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
] as const

function hashSeed(seed: string | number): number {
  if (typeof seed === "number") return Math.abs(seed)
  return seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
}

export function getPlaceholderEventImage(seed: string | number): string {
  return PLACEHOLDER_IMAGES[hashSeed(seed) % PLACEHOLDER_IMAGES.length]
}

/** Prefer Supabase image_url; fall back to a stable random placeholder per event */
export function getEventThumbnail(imageUrl: string | undefined, seed: string | number): string {
  return imageUrl?.trim() || getPlaceholderEventImage(seed)
}
