import { store } from '@/store';
import { useAccount } from '../useAccount';
import { useEffect } from 'react';
import { localCache } from '@/utils/localCache';

/** Hook */
export const useWatchAccount = () => {
  /** Retrieval */
  const account = useAccount();
  const { usersToken } = store.user();

  /** Actions */
  // 同步userTokens
  useEffect(() => {
    localCache.set('tokens', usersToken);
  }, [usersToken]);

  // 同步address
  useEffect(() => {
    localCache.set('address', account.address?.toLowerCase());
  }, [account.address]);
};
