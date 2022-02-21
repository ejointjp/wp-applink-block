// const { white } = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
  // mode: 'jit',
  content: [
    'src/js/**/*',
    'public/**/*.php'
  ],
  theme: {
    extend: {
      fontSize: {
        '3xs': '0.5rem',
        '2xs': '0.7rem'
      },
      screens: {
        '3xl': '1760px',
        '4xl': '1920px'
      },
      maxWidth: {
        '8xl': '80rem',
        '9xl': '110rem'
      },
      colors: {
        primary: 'var(--mh-primary)',
        secondary: 'var(--mh-secondary)',
        link: 'var(--mh-link)',
        gray: {
          transparent: {
            50: 'rgb(0 43 85 / 2%)',
            100: 'rgb(0 21 64 / 5%)',
            200: 'rgb(0 20 59 / 10%)',
            300: 'rgb(0 22 55 / 18%)',
            400: 'rgb(0 18 49 / 39%)',
            500: 'rgb(0 12 36 / 58%)',
            600: 'rgb(0 14 34 / 71%)',
            700: 'rgb(0 13 33 / 78%)',
            800: 'rgb(0 11 27 / 88%)',
            900: 'rgb(0 8 24 / 93%)'
          }
        }
      },
      lineHeight: {
        'extra-relaxed': '1.75'
      },
      borderRadius: {
        xs: '0.125rem',
        sm: '0.1875rem'
      }
    }
  },
  plugins: [
    plugin(function ({ addUtilities, addComponents, theme }) {
      const headings = {
        '.h1': {
          fontWeight: 'bold',
          fontSize: theme('fontSize.2xl'),
          '@screen sm': {
            fontSize: theme('fontSize.3xl')
          },
          '@screen lg': {
            fontSize: theme('fontSize.4xl')
          }
        },
        '.h2': {
          fontWeight: 'bold',
          fontSize: theme('fontSize.xl'),
          '@screen sm': {
            fontSize: theme('fontSize.2xl')
          },
          '@screen lg': {
            fontSize: theme('fontSize.3xl')
          }
        },
        '.h3': {
          fontWeight: 'bold',
          fontSize: theme('fontSize.lg'),
          '@screen md': {
            fontSize: theme('fontSize.xl')
          }
        }
      }
      addUtilities(headings, {
        variants: ['responsive']
      })

      const aspectRatios = {
        '.aspect-golden': { aspectRatio: '1.6181 / 1' },
        '.aspect-silver': { aspectRatio: '1.4142 / 1' },
        '.aspect-21x9': { aspectRatio: '21 / 9' },
        '.aspect-16x9': { aspectRatio: '16 / 9' },
        '.aspect-4x3': { aspectRatio: '4 / 3' },
        '.aspect-3x2': { aspectRatio: '3 / 2' },
        '.aspect-1x1': { aspectRatio: '1 / 1' }
      }

      addUtilities(aspectRatios, {
        variants: ['responsive']
      })

      const link = {
        '.link-primary': {
          color: 'inherit',
          '&:hover': {
            color: `${theme('colors.primary')} !important`
          }
        }
      }

      addUtilities(link)

      const states = {
        // '.state-normal': {
        //   backgroundColor: theme('colors.slate.100'),
        //   i: {
        //     color: theme('colors.gray.500')
        //   },
        //   a: {
        //     color: theme('colors.gray.800'),
        //     '.dark &': {
        //       color: theme('colors.white')
        //     }
        //   },
        //   '.dark &': {
        //     backgroundColor: theme('colors.zinc.700')
        //   }
        // },
        // '.state-info': {
        //   backgroundColor: theme('colors.blue.50'),
        //   color: theme('colors.blue.700'),
        //   i: {
        //     color: theme('colors.blue.400')
        //   },
        //   a: {
        //     color: theme('colors.blue.700'),
        //     borderBottomColor: theme('colors.blue.500')
        //   },
        //   '.dark &': {
        //     backgroundColor: theme('colors.blue.100'),
        //     color: theme('colors.blue.800')
        //   }
        // },
        // '.state-success': {
        //   backgroundColor: theme('colors.green.50'),
        //   color: theme('colors.green.700'),
        //   i: {
        //     color: theme('colors.green.400')
        //   },
        //   a: {
        //     color: theme('colors.green.700'),
        //     borderBottomColor: theme('colors.green.500')
        //   }
        // },
        '.state-warning': {
          backgroundColor: theme('colors.yellow.50'),
          color: theme('colors.yellow.700'),
          i: {
            color: theme('colors.yellow.400')
          },
          a: {
            color: theme('colors.yellow.700'),
            borderBottomColor: theme('colors.yellow.500')
          }
        },
        '.state-danger': {
          backgroundColor: theme('colors.red.50'),
          color: theme('colors.red.700'),
          i: {
            color: theme('colors.red.400')
          },
          a: {
            color: theme('colors.red.700'),
            borderBottomColor: theme('colors.red.400')
          }
        }
        // '.mh-state-solid-normal': {
        //   backgroundColor: theme('colors.gray.700'),
        //   border: `1px solid ${theme('colors.slate.200')}`,
        //   color: theme('colors.gray.700'),
        //   '.dark &': {
        //     backgroundColor: theme('colors.slate.200'),
        //     color: theme('colors.gray.700')
        //   }
        // }
      }
      addUtilities(states)

      // ダークモード対応のカラー
      // const flexColor = {
      //   '.mh-flex-text-2b': {}
      // }
      // addUtilities(flexColor)

      const clearfix = {
        '.clearfix': {
          '&:after': {
            content: '""',
            clear: 'both',
            display: 'block'
          }
        }
      }
      addUtilities(clearfix)

      const labels = {
        '.label': {
          backgroundColor: theme('colors.gray.200'),
          // fontSize: '0.9375rem',
          fontSize: theme('fontSize.sm'),
          borderRadius: theme('borderRadius.sm'),
          padding: '0.125rem 0.5rem',
          fontFamily: theme('fontFamily.sans'),
          fontWeight: theme('fontWeight.medium'),
          '.dark &': {
            backgroundColor: theme('colors.zinc.600')
          }
        }
      }

      addComponents(labels)

      // const captions = {
      //   '.mh-caption': {
      //     color: theme('colors.gray.500'),
      //     fontSize: theme('fontSize.xs'),
      //     marginTop: theme('spacing.1'),
      //     marginBottom: 0,
      //     paddingLeft: theme('spacing.2'),
      //     paddingRight: theme('spacing.2'),
      //     textAlign: 'center',
      //     a: {
      //       color: theme('colors.gray.500'),
      //       textDecoration: 'underline'
      //     }
      //   }
      // }

      // addComponents(captions)

      const box = {
        '.text-box': {
          borderRadius: theme('borderRadius.md'),
          padding: `${theme('spacing.4')} ${theme('spacing.5')}`,
          '&:where(ul, ol)': {
            paddingTop: theme('spacing.3'),
            paddingBottom: theme('spacing.3'),
            paddingRight: theme('spacing.4'),
            paddingLeft: theme('spacing.9')
          },
          '*:not(i) + *': {
            marginTop: theme('spacing.3')
          },
          'i:first-child': {
            lineHeight: '0',
            transform: 'translateY(0.85rem)',
            float: 'left',
            marginRight: theme('spacing.4'),
            '& ~ *': {
              marginLeft: theme('spacing.7')
            },
            '& ~ * + *': {
              marginTop: theme('spacing.3')
            }
          },
          '&::after': {
            content: '""',
            clear: 'both',
            display: 'block'
          }
          // '&-icon': {
          //   flexShrink: 0,
          //   paddingRight: theme('spacing.3'),
          //   color: theme('colors.slate.500'),
          //   transform: 'var(--tw-transform)',
          //   '--tw-translate-y': '0.125rem'
          // },
          // '&-content': {
          //   flexGrow: 1,
          //   '> * + *': {
          //     marginTop: theme('spacing.4')
          //   }
          // }
        }
      }

      addComponents(box)

      const buttons = {
        '.mh-button': {
          display: 'inline-block',
          cursor: 'pointer',
          fontWeight: theme('fontWeight.normal'),
          borderRadius: theme('borderRadius.md'),
          textAlign: 'center',
          // padding: `${theme('spacing.1')} ${theme('spacing.3')}`,
          padding: `${theme('spacing.2')} ${theme('spacing.4')}`,
          // lineHeight: theme('lineHeight'),
          borderWidth: '2px',
          borderStyle: 'solid',
          transition: 'border-color 0.2s, color 0.2s, background-color 0.2s'
        },

        '.mh-button-normal': {
          backgroundColor: theme('colors.gray.50'),
          'mix-blend-mode': 'multiply',
          borderColor: theme('colors.gray.300'),
          '&:hover': {
            borderColor: theme('colors.gray.400')
          },
          '.dark &': {
            borderColor: theme('colors.zinc.500'),
            '&:hover': {
              borderColor: theme('colors.zinc.400')
            }
          }
        },

        '.mh-button-submit': {
          color: 'white',
          backgroundColor: theme('colors.gray.700')
        },

        '.mh-button-primary': {
          color: 'white',
          backgroundColor: theme('colors.primary')
        },

        '.mh-button-outline': {
          color: theme('colors.gray.700'),
          backgroundColor: 'transparent',
          border: `2px solid ${theme('colors.gray.700')}`
        }
      }
      addComponents(buttons)

      // const tag = {
      // '.tag-wrapper': {
      //   display: 'flex',
      //   flexWrap: 'wrap',
      //   margin: `-${theme('spacing.1')}`
      // },
      // '.tag-item': {
      //   backgroundColor: theme('colors.gray.100'),
      //   fontSize: theme('fontSize.sm'),
      //   borderRadius: theme('borderRadius.sm'),
      //   padding: '0.125rem 0.5rem',
      //   fontFamily: theme('fontFamily.sans'),
      //   fontWeight: theme('fontWeight.medium'),
      //   margin: theme('spacing.1'),
      //   color: theme('colors.gray.600')
      // }
      // '&::before': {
      //   content: '"#"',
      //   color: theme('colors.gray.400'),
      //   marginRight: '0.0625rem'
      // }
      // }

      // addComponents(tag)

      const titles = {
        '.widget-title': {
          fontSize: theme('fontSize.base'),
          fontWeight: theme('fontWeight.semibold'),
          display: 'inline-block',
          marginBottom: theme('spacing.3'),
          borderBottom: `3px solid ${theme('colors.slate.200')}`,
          paddingBottom: theme('spacing.1')
        }
      }

      addComponents(titles)
    }),
    require('@tailwindcss/line-clamp')
  ],
  important: false,
  darkMode: 'class'
  // darkMode: 'media'
}
