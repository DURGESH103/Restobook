/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        black: '#0f0f0f',
        gray: {
          DEFAULT: '#2c2c2c',
          50: '#f9f9f9',
          100: '#f0f0f0',
          200: '#e4e4e4',
          300: '#d1d1d1',
          400: '#b4b4b4',
          500: '#9a9a9a',
          600: '#818181',
          700: '#6a6a6a',
          800: '#2c2c2c',
          900: '#0f0f0f',
        },
        gold: {
          DEFAULT: '#d4af37',
          50: '#fefcf0',
          100: '#fef7d7',
          200: '#fdeeb0',
          300: '#fbe083',
          400: '#f8cc4e',
          500: '#f4b942',
          600: '#d4af37',
          700: '#b8941f',
          800: '#967618',
          900: '#7a6019',
        },
        primary: {
          50: '#fefcf0',
          100: '#fef7d7',
          200: '#fdeeb0',
          300: '#fbe083',
          400: '#f8cc4e',
          500: '#d4af37',
          600: '#b8941f',
          700: '#967618',
          800: '#7a6019',
          900: '#5d4a14',
        }
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'slide-in-left': 'slideInLeft 0.8s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-gold': 'pulseGold 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-50px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.7)' },
          '70%': { boxShadow: '0 0 0 10px rgba(212, 175, 55, 0)' },
        }
      }
    },
  },
  plugins: [],
}