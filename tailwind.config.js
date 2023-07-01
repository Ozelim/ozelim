/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors' 

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        head: ['Monsterrat', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
      container: {
        center: true, 
        padding: '0.75rem'
      },
      colors: {
        primary: colors.teal,
        secondary: colors.yellow,
        accent: colors.lime
      },
    },
  },
  plugins: [],
}

