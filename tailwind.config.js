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
      keyframes: {
        typing: {
          'from': { width: '0' },
          'to': { width: '450px' },
        },
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'white' },
        },
      },
      animation: {
        typing: 'typing 3s steps(30, end) forwards',
        blink: 'blink 0.75s step-end infinite',
        'typing-blink': 'typing 3s steps(30, end) forwards, blink 0.75s step-end infinite',
      },
      boxShadow: {
        'bottom-shadow': '0 4px 10px #c7c1c1',
        'image-shadow': '0 15px 20px -5px #c7c1c1',
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
