'use client';

import { useAccount } from '@/hooks/useAccount';
import { store } from '@/store';
import { BtnUser } from './BtnUser';
import { DropUser } from './DropUser';
import { useEffect, useState } from 'react';
import { Popover } from '@/components/Popover/Popover';

/** Component */
export const ActionUser = () => {
  /** Retrieval */
  const account = useAccount();
  const { isPC } = store.global();

  /** Params */

  /** Actions */

  /** Template */
  return (
    <Popover placement="bottomRight" trigger={[isPC && account.address ? 'hover' : 'contextMenu']} content={<DropUser />}>
      <div>
        <BtnUser />
      </div>
    </Popover>
  );
};
