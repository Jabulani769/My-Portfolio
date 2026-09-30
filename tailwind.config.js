/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.html"
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'mobile': {'max':'767px'},
      'tablet': {'min': '768px', 'max':'1000px'},
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 15s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      boxShadow: {
        'bottom-shadow': '0 4px 10px #c7c1c1',
        'image-shadow': '0 15px 20px -5px #c7c1c1',
        'soft': '0 1px 2px rgba(16,24,40,0.05), 0 4px 16px -4px rgba(16,24,40,0.08)',
        'lift': '0 8px 28px -8px rgba(16,24,40,0.18)',
      },
      colors: {  
        orange: {
          500: '#f97316',
          600: '#ea580c',
        }
      }
    },
  },
  plugins: [],
}
