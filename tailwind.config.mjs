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
          DEFAULT: '#0a79c8', // Brand Blue (Secondary)
          primary: '#0b1121', // Dark Navy (Primary)
          secondary: {
            'ultra-dark': '#021828',
            'darker': '#043050',
            'dark': '#064978',
            'medium-dark': '#0861a0',
            DEFAULT: '#0a79c8',
            'medium-light': '#3b94d3',
            'light': '#6cafde',
            'lighter': '#9dc9e9',
            'ultra-light': '#cee4f4',
          },
          dark: '#040613',    // Darker shade of primary
          light: '#1489e1',   // Lighter shade of secondary
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
