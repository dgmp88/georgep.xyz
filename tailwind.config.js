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
      'fantasy',
      //   {
      //     mytheme: {
      //       // [, '#11488e', '#032550'];
      //       primary: '#020481',
      //       'primary-content': '#f9f9f9',
      //       secondary: 'red',
      //       accent: 'green',
      //       neutral: 'white',
      //       'base-100': '#ffffff00',
      //       'base-content': 'green',

      //       // 'primary-content': '#f9f9f9',
      //     },
      //   },
    ],
  },
};
