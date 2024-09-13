/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#252525',
        secondBack: '#202020',
        white: 'rgba(255, 255, 255, 0.82);',
      },
      transitionProperty: {
        height: 'height',
      },
    },
  },
  plugins: [],
};
