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
        market: ['Sofia Sans Semi Condensed', 'sans-serif']
      },
    container: {
        center: true,
        padding: '0.75rem',
        screens: {
          '2xl': theme.screens.xl,
        },
      },
      colors: {
        primary: '#015057',
        // secondary: '#e3ae27',
        secondary: '#ffd469',
        accent: colors.lime,
        heading: '#27272D',
      },
      borderRadius: {
        primary: theme.borderRadius['2xl'],
      },
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
    }
  },
  plugins: [],
}
