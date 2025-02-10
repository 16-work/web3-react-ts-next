'use client';

import { Svg } from '@/components/Icon/Svg';
import useWallet from '@/hooks/useWallet';
import { store } from '@/store';
import { useCreation } from '@/utils/ahooks';
import { tools } from '@/utils/tools';
import { SCREEN } from '@config/tailwindcss/screen';
import { useAccount } from 'wagmi';

/** Props */
interface Props {
  onClose?: () => void;
}

/** Component */
export const DropUser = (props: Props) => {
  /** Retrieval */
  const account = useAccount();
  const { screenType } = store.global();
  const { disconnect } = useWallet();

  /** Params */
  const list = useCreation(() => {
    const arr = [
      {
        label: 'Copy Address',
        icon: 'copy',
        onClick: () => {
          tools.copy(account.address!);
        },
      },
      {
        label: 'Disconnect',
        icon: 'logout',
        onClick: () => disconnect(),
      },
    ];

    if (screenType < SCREEN.MD) arr.pop();

    return arr;
  }, [screenType]);

  /** Template */
  return (
    account.address && (
      <div className="drop-user    relative md:px-20 md:py-10">
        {/* list */}
        {list.map((item, index) => (
          <div key={index}>
            {/* hr */}
            {index !== 0 && <div className="hr-1 my-10"></div>}

            {/* item */}
            <Item
              icon={item.icon}
              label={item.label}
              onClick={() => {
                item.onClick();
                props.onClose && props.onClose();
              }}
            />
          </div>
        ))}
      </div>
    )
  );
};

/** Props */
interface ItemProps {
  icon: string;
  label: string;
  className?: string;
  onClick: () => void;
}

/** Component */
const Item = (props: ItemProps) => {
  /** Template */
  return (
    <div className={`flex-align-x py-6 text-18 text-common-1 hover-primary ${props.className}`} onClick={props.onClick}>
      {/* icon */}
      <Svg name={props.icon} className="xs:w-40 md:w-20 mr-10" />

      {/* label */}
      <span className="font-base">{props.label}</span>
    </div>
  );
};
