/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "thermopharm.in" },
    ],
  },
  // Ensure Next.js rewrites are efficient for App Router
  experimental: {},
};

module.exports = nextConfig;
