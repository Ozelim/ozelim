/** @type {import('tailwindcss').Config} */

import theme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        head: ['Monsterrat', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
      container: {
        center: true,
        padding: '0.75rem',
        screens: {
          '2xl': theme.screens.xl,
        },
      },
      colors: {
        primary: colors.teal,
        secondary: colors.yellow,
        accent: colors.lime,
        heading: '#27272D',
      },
      borderRadius: {
        primary: theme.borderRadius['2xl'],
      },
    },
  },
  plugins: [],
}
