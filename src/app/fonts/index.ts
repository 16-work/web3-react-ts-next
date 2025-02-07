import localFont from 'next/font/local';

export const customFont = localFont({
  src: [
    {
      path: './font-normal.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './font-bold.otf',
      weight: 'bold',
      style: 'normal',
    },
  ],
  variable: '--font-custom',
});
