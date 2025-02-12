import { useMenus } from '@/hooks/useMenus';
import { store } from '@/store';
import Link from 'next/link';
import { DropUser } from '../LayoutActions/ActionUser/DropUser';
import { useAccount } from '@/hooks/useAccount';

/** Component */
export const Menus = () => {
  /** Retrieval */
  const menusHook = useMenus();
  const account = useAccount();
  const { setIsOpenDrawer } = store.global();

  /** Params */

  /** Actions */

  /** Template */
  return (
    <div className="flex flex-col gap-y-20">
      {account.address && <DropUser onClose={() => setIsOpenDrawer(false)} />}

      {menusHook.menus.map((item: any, index) => (
        <Link
          key={index}
          className={`relative hover-primary font-lg
            ${item.id === menusHook.state.activeMenuId ? 'text-primary-1' : 'text-tip-1'}
          `}
          href={item.path}
          onClick={() => {
            menusHook.state.activeMenuId = item.id;
            setIsOpenDrawer(false);
          }}
        >
          {/* label */}
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );
};
