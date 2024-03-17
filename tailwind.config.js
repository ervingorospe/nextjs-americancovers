/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./lib/components/**/*.{js,ts,jsx,tsx}",
    "./lib/function/**/*"
  ],
  theme: {
     // font families are defined here in the config
    // fonts need to be imported in the CSS tab
    fontFamily: {
      // default/main body font
      sans: ['Mulish', 'sans-serif'],
      
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      black: colors.black,
      gray: colors.slate,
      primary: {
        DEFAULT: '#ec1c24',
        '50': '#fff5f5',
        '100': '#ffe5e6',
        '200': '#ffccce',
        '300': '#ffa8ab',
        '400': '#ff7075',
        '500': '#fc3b42',
        // brand
        '600': '#ec1c24',
        '700': '#c91d22',
        '800': '#a81015',
        '900': '#901418'
      },
      secondary: {
        DEFAULT: '#001689',
        '50': '#f0f5ff',
        '100': '#e0ebff',
        '200': '#bdd4ff',
        '300': '#85b1ff',
        '400': '#528eff',
        '500': '#2965ff',
        '600': '#053bff',
        '700': '#0027eb',
        '800': '#001ac2',
        '900': '#001a9e',
        // brand
        '950': '#001689',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
    },
    opacity: {
      0: '0',
      5: '0.05',
      10: '.1',
      15: '.15',
      20: '.2',
      25: '.25',
      30: '.3',
      35: '.35',
      40: '.4',
      45: '.45',
      50: '.5',
      55: '.55',
      60: '.6',
      65: '.65',
      70: '.7',
      75: '.75',
      80: '.8',
      85: '.85',
      90: '.9',
      95: '.95',
      100: '1',
    },
    extend: {
      maxWidth: {
        prose: '75ch',
      },
      scale: {
        flipped: '-1',
      },
      zIndex: {
        1: '1',
        100: '100',
        1000: '1000',
        10000: '10000',
      },
      fill: {
        'link': 'var(--link-text)',
        'link-hover': 'var(--link-text-hover)',
        'primary-button': 'var(--primary-button-text)',
        'primary-button-hover': 'var(--primary-button-text-hover)',
        'secondary-button': 'var(--secondary-button-text)',
        'secondary-button-hover': 'var(--secondary-button-text-hover)',
        breadcrumps: 'var(--header-breadcrumps)'
      },
      textColor: {
        'link': 'var(--link-text)',
        'link-hover': 'var(--link-text-hover)',
        'primary-button': 'var(--primary-button-text)',
        'primary-button-hover': 'var(--primary-button-text-hover)',
        'secondary-button': 'var(--secondary-button-text)',
        'secondary-button-hover': 'var(--secondary-button-text-hover)',
        breadcrumps: 'var(--header-breadcrumps)'
      },
      borderColor: {
        'primary-button': 'var(--primary-button-border)',
        'primary-button-hover': 'var(--primary-button-border-hover)',
        'secondary-button': 'var(--secondary-button-border)',
        'secondary-button-hover': 'var(--secondary-button-border-hover)'
      },
      backgroundColor: {
        'header-color': 'var(--bg-header-color)',
        'primary-button': 'var(--primary-button-bg)',
        'primary-button-hover': 'var(--primary-button-bg-hover)',
        'secondary-button': 'var(--secondary-button-bg)',
        'secondary-button-hover': 'var(--secondary-button-bg-hover)'
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            'max-width': '75ch',
            '--tw-prose-links': theme('colors.primary[700]'),
            a: {
              'font-weight': '600',
            },
            'a:hover': {
              color: theme('colors.primary[600]'),
            },
            h1: {
              'font-family': theme('fonts.heading'),
              'font-weight': '600',
            },
            h2: {
              'font-family': theme('fonts.heading'),
              'font-weight': '600',
            },
            h3: {
              'font-family': theme('fonts.heading'),
              'font-weight': '600',
            },
            h4: {
              'font-family': theme('fonts.heading'),
              'font-weight': '600',
            },
          },
        },
        primary: {
          css: {
            '--tw-prose-body': theme('colors.gray[900]'),
            '--tw-prose-headings': theme('colors.gray[900]'),
            '--tw-prose-lead': theme('colors.primary[700]'),
            '--tw-prose-links': theme('colors.primary[900]'),
            '--tw-prose-bold': theme('colors.primary[900]'),
            '--tw-prose-counters': theme('colors.primary[600]'),
            '--tw-prose-bullets': theme('colors.primary[400]'),
            '--tw-prose-hr': theme('colors.primary[300]'),
            '--tw-prose-quotes': theme('colors.primary[900]'),
            '--tw-prose-quote-borders': theme('colors.primary[300]'),
            '--tw-prose-captions': theme('colors.primary[700]'),
            '--tw-prose-code': theme('colors.primary[900]'),
            '--tw-prose-pre-code': theme('colors.primary[100]'),
            '--tw-prose-pre-bg': theme('colors.primary[900]'),
            '--tw-prose-th-borders': theme('colors.primary[300]'),
            '--tw-prose-td-borders': theme('colors.primary[200]'),
          },
        },
        // custom color invert workaround
        'primary-invert': {
          css: {
            'a:hover': {
              color: theme('colors.primary[300]'),
            },
            '--tw-prose-body': theme('colors.primary[100]'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-lead': theme('colors.primary[300]'),
            '--tw-prose-links': theme('colors.white'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.primary[400]'),
            '--tw-prose-bullets': theme('colors.primary[500]'),
            '--tw-prose-hr': theme('colors.primary[600]'),
            '--tw-prose-quotes': theme('colors.primary[100]'),
            '--tw-prose-quote-borders': theme('colors.primary[600]'),
            '--tw-prose-captions': theme('colors.primary[400]'),
            '--tw-prose-code': theme('colors.white'),
            '--tw-prose-pre-code': theme('colors.primary[300]'),
            '--tw-prose-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-th-borders': theme('colors.primary[500]'),
            '--tw-prose-td-borders': theme('colors.primary[600]'),
          },
        },
        secondary: {
          css: {
            '--tw-prose-body': theme('colors.secondary[800]'),
            '--tw-prose-headings': theme('colors.secondary[900]'),
            '--tw-prose-lead': theme('colors.secondary[700]'),
            '--tw-prose-links': theme('colors.secondary[900]'),
            '--tw-prose-bold': theme('colors.secondary[900]'),
            '--tw-prose-counters': theme('colors.secondary[600]'),
            '--tw-prose-bullets': theme('colors.secondary[400]'),
            '--tw-prose-hr': theme('colors.secondary[300]'),
            '--tw-prose-quotes': theme('colors.secondary[900]'),
            '--tw-prose-quote-borders': theme('colors.secondary[300]'),
            '--tw-prose-captions': theme('colors.secondary[700]'),
            '--tw-prose-code': theme('colors.secondary[900]'),
            '--tw-prose-pre-code': theme('colors.secondary[100]'),
            '--tw-prose-pre-bg': theme('colors.secondary[900]'),
            '--tw-prose-th-borders': theme('colors.secondary[300]'),
            '--tw-prose-td-borders': theme('colors.secondary[200]'),
          },
        },
        // custom color invert workaround
        'secondary-invert': {
          css: {
            'a:hover': {
              color: theme('colors.secondary[300]'),
            },
            '--tw-prose-body': theme('colors.white'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-lead': theme('colors.secondary[100]'),
            '--tw-prose-links': theme('colors.white'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.secondary[200]'),
            '--tw-prose-bullets': theme('colors.secondary[300]'),
            '--tw-prose-hr': theme('colors.secondary[500]'),
            '--tw-prose-quotes': theme('colors.secondary[100]'),
            '--tw-prose-quote-borders': theme('colors.secondary[500]'),
            '--tw-prose-captions': theme('colors.secondary[400]'),
            '--tw-prose-code': theme('colors.white'),
            '--tw-prose-pre-code': theme('colors.secondary[300]'),
            '--tw-prose-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-th-borders': theme('colors.secondary[300]'),
            '--tw-prose-td-borders': theme('colors.secondary[400]'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
