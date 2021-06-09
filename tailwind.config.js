module.exports = {
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
    './data/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
    './types/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#FCFCFF',
          100: '#F2F0FF',
          300: '#D7D1FE',
          500: '#7863FF',
          700: '#5540DB',
          800: '#4635B5',
          900: '#231B5C',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
