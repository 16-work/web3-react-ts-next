import '@/assets/theme/index';
import '@/assets/styles/index.scss';
import { ToastContainer } from 'react-toastify';
import process from 'process';
import { Layout } from '@/components/Layout';
import { meta } from '@/constants/meta';
import { customFont } from './fonts';
import { Providers } from '@/components/Providers';
import { ReactNode, Suspense } from 'react';

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
        <title>{process.env.NEXT_PUBLIC_APPNAME}</title>
        <meta name="description" content={meta.description}></meta>
        <meta name="keywords" content={meta.keywords}></meta>
      </head>

      <body className={customFont.variable}>
        <Suspense fallback={<></>}>
          <Providers>
            <Layout>{props.children}</Layout>
            <ToastContainer />
          </Providers>
        </Suspense>
      </body>
    </html>
  );
}
