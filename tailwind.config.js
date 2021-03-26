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
        gray: colors.blueGray,
      },
      fontFamily: {
        sans: ['Objectivity', ...fontFamily.sans],
      },
      animation: {
        cursor: 'cursor .6s linear infinite alternate',
        type: 'type 1.8s ease-out .8s 1 normal both',
        'type-reverse': 'type 1.8s ease-out 8.8s infinite alternate-reverse both',
      },
      keyframes: {
        cursor: {
          '0%, 40%': { opacity: '1' },
          '60%, 100%': { opacity: '0' },
        },
        type: {
          '0%': { width: '0ch' },
          '5%, 10%': { width: '1ch' },
          '15%, 20%': { width: '2ch' },
          '25%, 30%': { width: '3ch' },
          '35%, 40%': { width: '4ch' },
          '45%, 50%': { width: '5ch' },
          '55%, 60%': { width: '6ch' },
          '65%, 70%': { width: '7ch' },
          '75%, 80%': { width: '8ch' },
          '85%, 90%': { width: '9ch' },
          '95%': { width: '10ch' },
        },
      },
    },
  },
  variants: {},
  plugins: [],
}
