/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}', './app/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Configure your color palette here
        cream: {
          100: '#FFFEFD',
          900: '#674B14'
        }
      },
      fontFamily: {
        inter: ['Inter'],
        recoleta: ["'Recoleta'"],
      },
    },
    variants: {
      extend: {
        textColor: ['group-hover'],
      }
    },
  },
  plugins: [],
}
