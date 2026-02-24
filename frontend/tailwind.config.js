module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
    corePlugins: {
      aspectRatio: false
    },
    theme: {
      extend: {
        colors: {
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
          tertiary: 'var(--color-tertiary)',
          statusRed: 'var(--color-statusRed)'
        },
        fontFamily: {
          default: 'Open Sans, sans-serif'
        },
        // --- Mijn added keyframes---
      keyframes: {
        shrinkIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      },
      animation: {
        'shrink-in': 'shrinkIn 0.3s ease-out forwards',
      }
      // -------------------------

      },
    },
    safelist: [],
    plugins: [
      // Aspect ratio safari fallback
      ({ matchUtilities, theme /* … */ }) => {
        // …
        matchUtilities(
          // https://gist.github.com/olets/9b833a33d01384eed1e9f1e106003a3b
          {
            aspect: (value) => ({
              '@supports (aspect-ratio: 1 / 1)': {
                aspectRatio: value
              },
              '@supports not (aspect-ratio: 1 / 1)': {
                // https://github.com/takamoso/postcss-aspect-ratio-polyfill
  
                '&::before': {
                  content: '""',
                  float: 'left',
                  paddingTop: `calc(100% / (${value}))`
                },
                '&::after': {
                  clear: 'left',
                  content: '""',
                  display: 'block'
                }
              }
            })
          },
          { values: theme('aspectRatio') }
        );
      }
    ]
  };
  