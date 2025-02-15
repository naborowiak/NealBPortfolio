/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'polaris': {
          primary: {
            DEFAULT: 'var(--polaris-primary)',
            dark: '#3DA76D'
          },
          secondary: {
            DEFAULT: 'var(--polaris-secondary)',
            dark: '#A4C9B9'
          },
          accent: {
            DEFAULT: 'var(--polaris-accent)',
            dark: '#3A5154'
          },
          bg: {
            DEFAULT: 'var(--polaris-bg)',
            dark: '#1A1A1A'
          },
          text: {
            DEFAULT: 'var(--polaris-text)',
            dark: '#E1E1E1'
          },
          border: {
            DEFAULT: 'var(--polaris-border)',
            dark: '#333333'
          },
          hover: {
            DEFAULT: 'var(--polaris-hover)',
            dark: '#2A2A2A'
          }
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
