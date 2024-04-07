/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './app/**/*.{js,jsx,ts,tsx}', 'node_modules/preline/dist/*.js'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        recoleta: ['Recoleta', 'sans-serif'],
      },
    },
  },
  plugins: [require('preline/plugin')],
}
