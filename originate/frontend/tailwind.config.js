/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Coffee-inspired color palette for Cafe Monteverde
        'coffee': {
          50: '#faf7f4',
          100: '#f0e8df',
          200: '#e1d1bf',
          300: '#cfb299',
          400: '#bd9373',
          500: '#a67c52',
          600: '#8b6240',
          700: '#6f4e33',
          800: '#5c3f2a',
          900: '#4a3320',
        },
        'green-mountain': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        }
      },
      fontFamily: {
        'display': ['Georgia', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'coffee-texture': "url('/coffee-texture.jpg')",
      }
    },
  },
  plugins: [],
}
