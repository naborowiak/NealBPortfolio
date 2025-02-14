/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      keyframes: {
        scaleAnim: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        scale: 'scaleAnim 300ms ease-in-out',
      },
      colors: {
        'polaris': {
          primary: 'var(--polaris-primary)',
          secondary: 'var(--polaris-secondary)',
          accent: 'var(--polaris-accent)',
          bg: 'var(--polaris-bg)',
          text: 'var(--polaris-text)',
          border: 'var(--polaris-border)',
          hover: 'var(--polaris-hover)',
        },
      },
    },
  },
  plugins: [],
};
