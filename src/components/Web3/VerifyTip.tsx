'use client';
import { useAccount } from '@/hooks/useAccount';
import useWallet from '@/hooks/useWallet';
import { store } from '@/store';
import { useUpdateEffect } from '@/utils/ahooks';
import { toast } from '@/utils/notification';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../Base/Button';

/** Component */
export const VerifyTip = () => {
  /** Retrieval */
  const account = useAccount();
  const { verify } = useWallet();
  const { usersToken, setUsersToken } = store.user();

  /** Params */
  const [isInit, setIsInit] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  /** Actions */
  // 清空过期token
  useEffect(() => {
    setUsersToken(account.address?.toLowerCase() ?? '', '');
    setIsInit(true);
  }, []);

  // 更新token关闭
  useUpdateEffect(() => {
    if (usersToken[account.address?.toLowerCase() ?? ''] && isInit) toast.dismiss?.();
  }, [usersToken, account.address]);

  /** Template */
  return (
    <div ref={componentRef}>
      <span className="text-common-1 font-2xl">Unauthorized</span>

      <Button
        fullWidth
        className="btn-primary xs:h-60 md:h-40 mt-10 rounded-8 text-common-1 font-base"
        onClick={async () => {
          await verify();
        }}
      >
        Verify
      </Button>
    </div>
  );
};
