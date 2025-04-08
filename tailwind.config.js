/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", 
    "./src/**/*.{html,js,jsx,ts,tsx}", // Ensure to include all file types where Tailwind classes might be used
  ],
  darkMode: 'class',
  theme: {
    extend: {
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
