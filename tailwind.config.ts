import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        'bg-primary': '#FFFFFF',
        'bg-secondary': '#F6F9FC',
        'bg-tertiary': '#EDF2F7',
        'bg-dark': '#0A2540',
        'bg-dark-secondary': '#1A1F36',

        // Brand
        'brand': {
          DEFAULT: '#635BFF',
          hover: '#5851EA',
          light: '#F5F3FF',
        },

        // Text
        'text-primary': '#1A1D2E',
        'text-secondary': '#425466',
        'text-muted': '#6B7385',
        'text-light': '#8892A2',

        // Semantic
        'success': {
          DEFAULT: '#00A67E',
          hover: '#059669',
          light: '#DCFCE7',
          dark: '#166534',
        },
        'danger': {
          DEFAULT: '#DC2626',
          hover: '#B91C1C',
          light: '#FEE2E2',
          dark: '#991B1B',
        },
        'warning': {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
          light: '#FEF3C7',
        },
        'info': {
          DEFAULT: '#3B82F6',
          hover: '#2563EB',
          light: '#DBEAFE',
        },

        // Borders
        'border-light': '#E2E8F0',
        'border-medium': '#CBD5E1',
        'border-dark': '#64748B',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      fontSize: {
        'display': ['clamp(4rem, 10vw, 8rem)', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'hero': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h1': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h2': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.4', fontWeight: '600' }],
        'h4': ['1.125rem', { lineHeight: '1.5', fontWeight: '600' }],
        'body-lg': ['1.25rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'caption': ['0.75rem', { lineHeight: '1.5', fontWeight: '500', letterSpacing: '0.02em' }],
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'sm': '0 2px 4px -1px rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
        'card': '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        'card-hover': '0 25px 50px -12px rgb(0 0 0 / 0.15), 0 12px 24px -8px rgb(0 0 0 / 0.1)',
        'elevated': '0 10px 40px -10px rgb(0 0 0 / 0.12), 0 4px 12px -2px rgb(0 0 0 / 0.06)',
        'elevated-hover': '0 25px 60px -15px rgb(0 0 0 / 0.18), 0 10px 30px -10px rgb(0 0 0 / 0.1)',
        'button': '0 10px 15px -3px rgb(99 91 255 / 0.25)',
        'button-hover': '0 20px 30px -5px rgb(99 91 255 / 0.35)',
        'glow': '0 0 40px -10px rgb(99 91 255 / 0.3)',
        'glow-lg': '0 0 60px -15px rgb(99 91 255 / 0.4)',
        'inner-glow': 'inset 0 1px 0 0 rgb(255 255 255 / 0.1)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        // Premium effects
        'beam': 'beam 2s linear infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'text-reveal': 'textReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'border-beam': 'borderBeam 4s linear infinite',
        'confetti': 'confetti 1s ease-out forwards',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Beam effect - gradient running horizontally
        beam: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        // Shimmer effect - subtle opacity pulse
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        // Float effect - gentle vertical movement
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        // Glow pulse - shadow intensity change
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99, 91, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(99, 91, 255, 0.5)' },
        },
        // Text reveal - clip from bottom
        textReveal: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        // Slide animations
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        // Scale in
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        // Border beam - for animated borders
        borderBeam: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        // Confetti burst
        confetti: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'scale(1.2) rotate(180deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(360deg)', opacity: '0' },
        },
        // Subtle bounce
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config
