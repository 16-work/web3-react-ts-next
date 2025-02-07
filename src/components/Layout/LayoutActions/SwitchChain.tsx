'use client';

import { Button } from '@/components/Base/Button';
import { Svg } from '@/components/Icon/Svg';
import { CHAINS_ICON } from '@/constants/chain';
import { useAccount } from '@/hooks/useAccount';
import useWallet from '@/hooks/useWallet';

/** Component */
export const SwitchChain = () => {
  /** Retrieval */
  const account = useAccount();
  const { switchChain } = useWallet();

  /** Template */
  return (
    account.address && (
      <Button onClick={switchChain} className="btn-switch-chain    rounded-full">
        <Svg name={account.chain ? CHAINS_ICON[account.chain.id] : 'wrong-network'} className={`xs:w-50 md:w-28 ${!account.chain && 'text-stress-1'}`} />
      </Button>
    )
  );
};
