/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
 images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'web.whatsapp.com',
    },
  ],
 },
}

export default nextConfig