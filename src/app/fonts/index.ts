import localFont from 'next/font/local';

export const customFont = localFont({
  src: [
    {
      path: './font-thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: './font-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './font-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-custom',
});
