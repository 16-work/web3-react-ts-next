'use client';

import { Button } from '@/components/Base/Button';
import { useAccount } from '@/hooks/useAccount';
import { useTranslation } from '@/hooks/useTranslation';
import useWallet from '@/hooks/useWallet';
import { format } from '@/utils/format';

const baseClassName = 'xs:w-full md:w-fit xs:h-80 md:h-40 px-20 rounded-8 font-base';

/** Component */
export const BtnUser = () => {
  /** Retrieval */
  const account = useAccount();
  const { t } = useTranslation();
  const { connect } = useWallet();

  /** Template */
  return account.address ? (
    // btn: user
    <button className={`btn-user    ${baseClassName} btn-primary `}>{format.address(account.address, 6, 4)}</button>
  ) : (
    // btn: connect
    <Button onClick={connect} isLoading={account.isConnecting || account.isReconnecting} className={`btn-connect    ${baseClassName} btn-primary `}>
      {t.account.connect}
    </Button>
  );
};
