'use client';
import { Button } from '@/components/Base/Button';
import { Drawer } from '@/components/Base/Drawer';
import { Svg } from '@/components/Icon/Svg';
import useWallet from '@/hooks/useWallet';
import { store } from '@/store';
import { ActionUser } from '../LayoutActions/ActionUser';
import { SwitchLanguage } from '../LayoutActions/SwitchLanguage';
import { SwitchTheme } from '../LayoutActions/SwitchTheme';
import { Menus } from './Menus';
import { useAccount } from '@/hooks/useAccount';

/** Component */
export const LayoutDrawer = () => {
  /** Retrieval */
  const account = useAccount();
  const { disconnect } = useWallet();
  const { isOpenDrawer, setIsOpenDrawer } = store.global();

  /** Params */

  /** Template */
  return (
    <Drawer isShow={isOpenDrawer} placement="right" hideHeader onClose={() => setIsOpenDrawer(false)}>
      <div className="flex flex-col justify-between flex-1">
        {/* top */}
        <div className="flex flex-col gap-y-40">
          <ActionUser />

          {/* menus */}
          <Menus />
        </div>

        {/* bottom */}
        {account.address && (
          <div className="flex-align-x justify-between">
            {/* left */}
            <div className="flex-align-x gap-x-30">
              <SwitchTheme />
              <SwitchLanguage />
            </div>

            {/* right */}
            <Button onClick={disconnect}>
              <Svg name="logout" className="w-50" />
            </Button>
          </div>
        )}
      </div>
    </Drawer>
  );
};
