const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    content: ['./pages/**/*.{js,ts,jsx,tsx,.mdx}', './components/**/*.{js,ts,jsx,tsx,.mdx}'],
    options: {
      keyframes: true,
    },
  },
  darkMode: 'class',
  theme: {
    screens: {
      md: '768px',
      '2xl': '2560px',
    },
    extend: {
      colors: {
        brand: {
          DEFAULT: '#3429AA',
          secondary: '#6A86CF',
          tint: '#A3B5E3',
          accent: '#FF9A63',
        },
        gray: colors.trueGray,
      },
      fontFamily: {
        sans: ['Objectivity', ...fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [],
}
