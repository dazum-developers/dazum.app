import type { Config } from 'tailwindcss'

import forms from '@tailwindcss/forms'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', 'node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        recoleta: ['Recoleta', 'sans-serif'],
      },
    },
  },
  plugins: [forms()],
}

export default config
