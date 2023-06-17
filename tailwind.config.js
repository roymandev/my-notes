const plugin = require('tailwindcss/plugin');

const BG_CLIP_TEXT = {
  'background-clip': 'text',
  '-webkit-background-clip': 'text',
  '-webkit-text-fill-color': 'transparent',
  'text-fill-color': 'transparent',
};

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
      stemGreen: {
        100: '#F7FDF4',
        200: '#EDFBE6',
        300: '#DBF7CD',
        400: '#C8F4B4',
        500: '#B6F09C',
        600: '#9AD37F',
        700: '#739F5F',
        800: '#4D6A3F',
        900: '#263520',
      },
      dayBlue: {
        100: '#EBEDFC',
        200: '#D2D8F9',
        300: '#A6B0F2',
        400: '#7989EC',
        500: '#4D62E5',
        600: '#3045C9',
        700: '#243497',
        800: '#182364',
        900: '#0C1132',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, addComponents }) {
      addUtilities({
        '.text-green-blue-500': {
          'background-image':
            'linear-gradient(225deg, #82DBF7 0%, #B6F09C 100%)',
          ...BG_CLIP_TEXT,
        },
        '.text-blue-green-500': {
          'background-image':
            'linear-gradient(45deg, #82DBF7 0%, #B6F09C 100%)',
          ...BG_CLIP_TEXT,
        },
        '.text-dayblue-blue-green-500': {
          'background-image':
            'linear-gradient(45deg, #4D62E5 0%, #87DDEE 45.31%, #B6F09C 100%)',
          ...BG_CLIP_TEXT,
        },
      });

      addComponents({});
    }),
  ],
};
