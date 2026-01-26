import type { NextConfig } from 'next'

/**
 * Security headers for all routes
 * Based on OWASP recommendations
 */
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Security headers for all routes
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },

  // Redirect old WordPress routes to relevant pages
  async redirects() {
    return [
      // ===========================================
      // CANONICAL BLOG URL: /blog/slug
      // Redirect old /recursos/blog to /blog
      // ===========================================
      {
        source: '/recursos/blog',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/recursos/blog/:slug*',
        destination: '/blog/:slug*',
        permanent: true,
      },

      // ===========================================
      // OLD WORDPRESS ROOT POSTS → Redirect to /blog/slug
      // Some WP posts were at root level (not in /blog/)
      // Now they live in /blog/slug
      // ===========================================
      {
        source: '/sla-o-que-e-como-elaborar-e-como-acompanhar-os-kpis-do-service-level-agreement',
        destination: '/blog/sla-o-que-e-como-elaborar-e-como-acompanhar-os-kpis-do-service-level-agreement',
        permanent: true,
      },
      {
        source: '/o-que-e-spin-selling-e-como-aplica-lo-para-otimizar-vendas',
        destination: '/blog/o-que-e-spin-selling-e-como-aplica-lo-para-otimizar-vendas',
        permanent: true,
      },
      {
        source: '/o-que-significa-customer-relationship-management-e-como-o-crm-pode-me-ajudar-a-vender-mais',
        destination: '/blog/o-que-significa-customer-relationship-management-e-como-o-crm-pode-me-ajudar-a-vender-mais',
        permanent: true,
      },
      {
        source: '/bitrix24-o-sistema-crm-definitivo-para-vendas-produtividade-e-gestao-de-projetos-zopu',
        destination: '/blog/bitrix24-o-sistema-crm-definitivo-para-vendas-produtividade-e-gestao-de-projetos-zopu',
        permanent: true,
      },
      {
        source: '/integracao-do-rd-station-com-o-bitrix24',
        destination: '/blog/integracao-do-rd-station-com-o-bitrix24',
        permanent: true,
      },
      {
        source: '/comunicacao-interna-e-endomarketing',
        destination: '/blog/comunicacao-interna-e-endomarketing',
        permanent: true,
      },
      {
        source: '/os-planos-arquivados-do-bitrix24-irao-acabar-saiba-mais',
        destination: '/blog/os-planos-arquivados-do-bitrix24-irao-acabar-saiba-mais',
        permanent: true,
      },
      {
        source: '/o-que-e-scrum-e-como-aplicar-no-bitrix24',
        destination: '/blog/o-que-e-scrum-e-como-aplicar-no-bitrix24',
        permanent: true,
      },
      {
        source: '/pitch-de-vendas-5-passos-infaliveis',
        destination: '/blog/pitch-de-vendas-5-passos-infaliveis',
        permanent: true,
      },

      // ===========================================
      // OLD WORDPRESS PAGES
      // ===========================================
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
        destination: '/',
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

      // ===========================================
      // COMMON WORDPRESS PATHS
      // ===========================================
      {
        source: '/wp-content/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-admin',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-login.php',
        destination: '/',
        permanent: true,
      },
      {
        source: '/feed',
        destination: '/',
        permanent: true,
      },
      {
        source: '/feed/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/author/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tag/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/category/:path*',
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
