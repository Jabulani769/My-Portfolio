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
      boxShadow: {
        'soft': '0 1px 2px rgba(16,24,40,0.05), 0 4px 16px -4px rgba(16,24,40,0.08)',
        'lift': '0 8px 28px -8px rgba(16,24,40,0.18)',
      },
    },
  },
  plugins: [],
}
