const { spacing, fontFamily } = require('tailwindcss/defaultTheme')
const typography = require('@tailwindcss/typography')
const colors = require('tailwindcss/colors')

const resetPreCode = {
  pre: false,
  code: false,
  'pre code': false,
}

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
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
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.brand.DEFAULT'),
              fontWeight: 'bold',
              textDecoration: 'none',
              position: 'relative',
              '&:hover': { color: theme('colors.brand.DEFAULT') },
              code: { color: theme('colors.brand.DEFAULT') },
            },
            'h2,h3,h4': {
              'scroll-margin-top': spacing[32],
            },
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false,
            ...resetPreCode,
          },
        },
        sm: {
          css: {
            ...resetPreCode,
          },
        },
        '2xl': {
          css: {
            ...resetPreCode,
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.brand.secondary'),
              '&:hover': { color: theme('colors.brand.secondary') },
              code: { color: theme('colors.blue.400') },
            },
            blockquote: {
              borderLeftColor: theme('colors.gray.700'),
              color: theme('colors.gray.300'),
            },
            'h1,h2,h3,h4': {
              color: theme('colors.gray.100'),
            },
            hr: { borderColor: theme('colors.gray.700') },
            ol: {
              li: {
                '&:before': { color: theme('colors.gray.500') },
              },
            },
            ul: {
              li: {
                '&:before': { backgroundColor: theme('colors.gray.500') },
              },
            },
            strong: { color: theme('colors.gray.300') },
            thead: {
              color: theme('colors.gray.100'),
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700'),
              },
            },
          },
        },
      }),
    },
  },
  variants: {
    typography: ['responsive', 'dark'],
  },
  plugins: [typography({ modifiers: ['sm', '2xl'] })],
}
