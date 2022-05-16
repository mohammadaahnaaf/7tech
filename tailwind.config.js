module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1300px',
    },
    container: {
      center: true,
      padding: '1.5rem',
    },
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        primary: '#000000',
        'secondary-alternative': '#FCE3EB',
        secondary: '#FEDD6B',
      },
      transitionTimingFunction: {
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
    },
  },
  variants: {
    extend: {
      display: ['group-hover', 'group-focus'],
      visibility: ['group-hover'],
      width: ['responsive', 'hover', 'group-hover'],
    },
  },
  // plugins: [
  //   require('@tailwindcss/forms'),
  //   require('@tailwindcss/aspect-ratio'),
  // ],
};