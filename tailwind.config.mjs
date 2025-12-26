import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      maxWidth: {
        'site': '1400px',
      },
      colors: {
        'queens': {
          DEFAULT: '#0a79c8', // Brand Blue
          primary: '#0a79c8', // Brand Blue (Primary - main CTA color)
          secondary: '#0b1121', // Dark Navy (Secondary - text/accents)
          dark: '#040613',    // Darker shade
          light: '#1489e1',   // Lighter shade of primary
          white: '#ffffff',
          gray: '#f4f4f4',
        }
      },
      fontFamily: {
        sans: ['"Instrument Sans"', 'Inter', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        serif: ['"Source Serif 4"', 'serif'],
        anton: ['Anton', 'sans-serif'],
        yellowtail: ['Yellowtail', 'cursive'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(to right, rgba(17,17,17,0.95), rgba(17,17,17,0.6))',
      }
    },
  },
  plugins: [
    typography,
  ],
}
