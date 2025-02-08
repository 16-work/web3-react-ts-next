'use client';
import { WAGMI_CONFIG } from '@/constants/wagmi';
import { store } from '@/store';
import { RainbowKitProvider, darkTheme, lightTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useMemo } from 'react';
import { WagmiProvider } from 'wagmi';

/** Constants */
const queryClient = new QueryClient();
const theme = { accentColor: 'rgb(var(--cus-primary-1))' }; // 主题

/** Component */
export const ProviderWallet = (props: { children: ReactNode }) => {
  /** Retrieval */
  const { language } = store.global();

  /** Params */
  const locale = useMemo(() => {
    switch (language) {
      case 'zh-CN':
        return 'zh';
      case 'zh-TW':
        return 'zh';
      default:
        return 'en';
    }
  }, [language]);

  /** Template */
  return (
    <WagmiProvider config={WAGMI_CONFIG}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale={locale} theme={store.global().theme.search('light') !== -1 ? lightTheme(theme) : darkTheme(theme)} coolMode>
          {props.children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
