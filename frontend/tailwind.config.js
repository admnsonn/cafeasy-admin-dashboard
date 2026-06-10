/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'sidebar': '#111827',
        'sidebar-light': '#1f2937',
        'sidebar-text': '#cbd5e1',
        'bg-light': '#f3f4f6',
        'bg-white-light': '#f8fafc',
      }
    },
  },
  plugins: [],
}
