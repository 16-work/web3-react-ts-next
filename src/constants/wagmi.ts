'use client';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  bitgetWallet,
  coinbaseWallet,
  imTokenWallet,
  metaMaskWallet,
  okxWallet,
  tokenPocketWallet,
  trustWallet,
  walletConnectWallet,
  binanceWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { chains, SUPPORT_CHAIN_IDS } from './chain/index';

//@ts-ignore
export const WAGMI_CONFIG = getDefaultConfig({
  appName: process.env.NEXT_PUBLIC_APPNAME!,
  projectId: '8de5a8f4d65f36d28b3e25fb7129fbda',
  chains: Object.values(chains).filter((chain) => SUPPORT_CHAIN_IDS.includes(chain.id as never)) as any,
  wallets: [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet, okxWallet, binanceWallet, bitgetWallet, coinbaseWallet, walletConnectWallet, trustWallet, imTokenWallet, tokenPocketWallet],
    },
  ],
}) as any; // Config (wagmi | @wagmi/core)
