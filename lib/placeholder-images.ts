/** Temporary dev placeholders - used only when no image is available */
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

/**
 * Get the full Supabase storage URL for an image path
 * @param path - Storage path (e.g., "event-images/abc123.jpg")
 * @param bucket - Storage bucket name (default: "event-images")
 */
export function getStorageUrl(path: string, bucket: string = "event-images"): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) {
    console.error("NEXT_PUBLIC_SUPABASE_URL is not defined")
    return ""
  }
  
  // Remove bucket prefix if it's already in the path
  const cleanPath = path.startsWith(`${bucket}/`) ? path.slice(bucket.length + 1) : path
  
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${cleanPath}`
}

/**
 * Get event thumbnail URL - handles both storage paths and full URLs
 * Priority: 1) Full URL from DB, 2) Storage path converted to URL, 3) Placeholder
 */
export function getEventThumbnail(imageUrl: string | undefined, seed: string | number): string {
  if (!imageUrl?.trim()) {
    return getPlaceholderEventImage(seed)
  }
  
  const trimmedUrl = imageUrl.trim()
  
  console.log(trimmedUrl, { trimmedUrl })
  // If it's already a full URL (http/https), use it directly
  if (trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://")) {
    return trimmedUrl
  }
  
  // Otherwise, assume it's a storage path and convert it
  return getStorageUrl(trimmedUrl)
}
