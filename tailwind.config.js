/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5B4CFF',
        secondary: '#8B7FFF',
        accent: '#FF6B6B',
        surface: '#FFFFFF',
        background: '#F8F9FB',
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3',
        purple: {
          50: '#F0EFFF',
          100: '#E3E1FF',
          200: '#CBCAFF',
          300: '#A8A4FF',
          400: '#8B7FFF',
          500: '#5B4CFF',
          600: '#4C3EF0',
          700: '#3D2FD4',
          800: '#2F23A8',
          900: '#251B85'
        }
      },
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'sans-serif'],
        'body': ['Inter', 'sans-serif']
      },
      animation: {
        'scale-check': 'scale-check 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'progress-ring': 'progress-ring 1s ease-out'
      },
      keyframes: {
        'scale-check': {
          '0%': { transform: 'scale(0.8)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'progress-ring': {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' }
        }
      }
    },
  },
  plugins: [],
}