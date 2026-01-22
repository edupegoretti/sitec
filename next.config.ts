import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Redirect non-www to www (canonical URL)
  async redirects() {
    return [
      // Redirect old WordPress routes to new equivalents
      {
        source: '/blog/:slug*',
        destination: '/recursos/blog/:slug*',
        permanent: true,
      },
      {
        source: '/servicos',
        destination: '/',
        permanent: true,
      },
      {
        source: '/servicos/:slug*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/cursos',
        destination: '/recursos',
        permanent: true,
      },
      {
        source: '/cursos/:slug*',
        destination: '/recursos/:slug*',
        permanent: true,
      },
      {
        source: '/politicadeprivacidade',
        destination: '/privacidade',
        permanent: true,
      },
      {
        source: '/chatapp',
        destination: '/',
        permanent: true,
      },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react'],
  },
}

export default nextConfig
