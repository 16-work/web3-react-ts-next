'use client';

import { Button } from '@/components/Base/Button';
import { Svg } from '@/components/Icon/Svg';
import { CHAINS_ICON } from '@/constants/chain';
import { useAccount } from '@/hooks/useAccount';
import useWallet from '@/hooks/useWallet';
import { useEffect, useState } from 'react';

/** Component */
export const SwitchChain = () => {
  /** Retrieval */
  const account = useAccount();
  const { switchChain } = useWallet();

  /** Params */
  const [mounted, setMounted] = useState(false);

  /** Actions */
  // 防止wagmi报Hydration failed
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  /** Template */
  return (
    account.address && (
      <Button onClick={switchChain} className="btn-switch-chain    rounded-full">
        {/* aspect-square别去掉，否则Next里aspect会玄学失效 */}
        <Svg
          name={account.chain ? CHAINS_ICON[account.chain.id] : 'wrong-network'}
          className={`xs:w-50 md:w-28 aspect-square ${!account.chain && 'text-stress-1'}`}
        />
      </Button>
    )
  );
};
