/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#C6A75E',
          50: '#FAF7F0',
          100: '#F0E9D8',
          200: '#E5D9B8',
          300: '#D9C698',
          400: '#CEB77B',
          500: '#C6A75E',
          600: '#B08F45',
          700: '#8A7036',
          800: '#645128',
          900: '#3E321A',
        },
        dark: {
          DEFAULT: '#0F0F0F',
          secondary: '#161616',
          tertiary: '#1E1E1E',
        },
        light: {
          DEFAULT: '#F5F5F5',
          secondary: '#B8B8B8',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '500' }],
        'h1': ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '500' }],
        'h2': ['2.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '500' }],
        'h3': ['2rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '500' }],
        'h4': ['1.5rem', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '500' }],
        'body': ['1rem', { lineHeight: '1.7', letterSpacing: '0.01em', fontWeight: '400' }],
        'small': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0.01em', fontWeight: '400' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'large': '0 8px 32px rgba(0, 0, 0, 0.12)',
        'gold': '0 2px 12px rgba(198, 167, 94, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
    },
  },
  plugins: [],
}