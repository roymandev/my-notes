/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000',
      white: '#fff',
      nobleBlack: {
        100: '#E8E9E9',
        200: '#CDCECF',
        300: '#9B9C9E',
        400: '#686B6E',
        500: '#363A3D',
        600: '#1A1D21',
        700: '#131619',
        800: '#0D0F10',
        900: '#060708',
      },
    },
  },
  plugins: [],
};
