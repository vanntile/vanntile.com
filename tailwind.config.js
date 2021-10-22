const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
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
      xl: '1280px',
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
        type: 'type 2.7s ease-out .8s infinite alternate both',
      },
      keyframes: {
        cursor: {
          '0%, 40%': { opacity: 1 },
          '60%, 100%': { opacity: 0 },
        },
        type: {
          '0%': { transform: 'translateX(0ch)' },
          '5%, 10%': { transform: 'translateX(1ch)' },
          '15%, 20%': { transform: 'translateX(2ch)' },
          '25%, 30%': { transform: 'translateX(3ch)' },
          '35%, 40%': { transform: 'translateX(4ch)' },
          '45%, 50%': { transform: 'translateX(5ch)' },
          '55%, 60%': { transform: 'translateX(6ch)' },
          '65%, 70%': { transform: 'translateX(7ch)' },
          '75%, 80%': { transform: 'translateX(8ch)' },
          '85%, 90%': { transform: 'translateX(9ch)' },
          '95%, 100%': { transform: 'translateX(11ch)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-visuallyhidden')(), require('tailwindcss-scroll-snap')],
}
