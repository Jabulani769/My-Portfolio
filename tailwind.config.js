/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{html,js}",                // Covers all HTML/JS files in the project
    "./src/**/*.{js,jsx,ts,tsx}",     // For React/Vite/Next.js projects
    "./public/index.html"              // If using a public/index.html
  ],
  theme: {
    extend: {
      boxShadow: {
        'bottom-shadow': '0 4px 10px #c7c1c1',
        'image-shadow': '0 15px 20px -5px #c7c1c1',
      },
      colors: {  // Use `colors` instead of individual `textColor`, `borderColor`, etc.
        orange: {
          500: '#f97316',
          600: '#ea580c',
        }
      }
    },
  },
  plugins: [],
}