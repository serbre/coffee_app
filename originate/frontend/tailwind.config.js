/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern coffee palette - black/white base with warm accents
        'coffee': {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
        // Accent color - warm amber/orange for CTAs
        'accent': {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        // Subtle earth tones for farm imagery
        'earth': {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e4e4e3',
          300: '#d4d4d2',
          400: '#a3a39f',
          500: '#737370',
          600: '#52524e',
          700: '#3d3d39',
          800: '#262624',
          900: '#171715',
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
