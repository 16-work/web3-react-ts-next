/** @type {import('tailwindcss').Config} */

import { cusColors } from './config/tailwindcss/color';
import { screenSizes, commonSizes } from './config/tailwindcss/sizes';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      ...cusColors.primary,
      ...cusColors.feature,
      ...cusColors.base,
      ...cusColors.second,
    },
    textColor: {
      ...cusColors.primary,
      ...cusColors.second,
      ...cusColors.feature,
      ...cusColors.base,
      ...cusColors.text,
    },
    extend: {
      fontFamily: {
        custom: 'var(--font-custom)',
      },
      screens: screenSizes,
      fontSize: commonSizes,
      width: commonSizes,
      minWidth: commonSizes,
      maxWidth: commonSizes,
      height: commonSizes,
      minHeight: commonSizes,
      maxHeight: commonSizes,
      padding: commonSizes,
      margin: commonSizes,
      inset: commonSizes,
      gap: commonSizes,
      borderWidth: commonSizes,
      borderRadius: commonSizes,
      lineHeight: commonSizes,
    },
  },
  plugins: [],
};
