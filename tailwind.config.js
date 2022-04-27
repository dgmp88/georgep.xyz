module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      // 'fantasy',
      {
        mytheme: {
          primary: '#005f73',
          // 'primary-content': '#f9f9f9',
          secondary: '#bb3e03',
          accent: 'green',
          // neutral: 'white',
          'base-100': '#ffffff00',
          // 'base-content': 'green',

          // 'primary-content': '#f9f9f9',
        },
      },
    ],
  },
};
