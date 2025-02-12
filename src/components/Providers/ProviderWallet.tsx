'use client';

import { ConnectionProvider, WalletProvider as SolanaContextProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  TrustWalletAdapter,
  WalletConnectWalletAdapter,
  SolflareWalletAdapter,
  TokenPocketWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { Connection } from '@solana/web3.js';
import { FC, ReactNode, useMemo } from 'react';
import '@solana/wallet-adapter-react-ui/styles.css';
import { SOLANA_CLUSTER } from '@/constants/rpc';

export const connection = new Connection(SOLANA_CLUSTER);

export const ProviderWallet: FC<{ children: ReactNode }> = ({ children }) => {
  const endpoint = SOLANA_CLUSTER;
  const wallets = useMemo(() => {
    return [
      new PhantomWalletAdapter(),
      new TrustWalletAdapter(),
      new SolflareWalletAdapter(),
      new TokenPocketWalletAdapter(),
      new WalletConnectWalletAdapter({
        // @ts-ignore
        network: 'mainnet-beta',
        options: {
          relayUrl: 'wss://relay.walletconnect.com',
          projectId: 'e899c82be21d4acca2c8aec45e893598',
          // @ts-ignore
          metadata: {
            name: process.env.NEXT_PUBLIC_APPNAME,
            description: process.env.NEXT_PUBLIC_APPNAME,
            url: '',
          },
        },
      }),
    ];
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaContextProvider wallets={wallets} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </SolanaContextProvider>
    </ConnectionProvider>
  );
};
