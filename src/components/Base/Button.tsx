'use client';

import { useAccount } from '@/hooks/useAccount';
import { useTranslation } from '@/hooks/useTranslation';
import useWallet from '@/hooks/useWallet';
import { ButtonProps, Button as NButton } from '@nextui-org/button';
import Link from 'next/link';
import { useMemo } from 'react';
import { Svg } from '../Icon/Svg';

enum BtnStatus {
  CORRECT = 1,
  UNCONNECT = -1,
  WRONGNETWORK = -2,
}

/** Props */
interface Props extends Omit<ButtonProps, 'disabled'> {
  to?: string;
  auth?: boolean;
  isDisabled?: boolean;
}

/** Component
 * 注意: 这个button自带position: relative
 */
export const Button = (props: Props) => {
  /** Retrieval */
  const account = useAccount();
  const { t } = useTranslation();
  const { connect, switchChain } = useWallet();

  /** Params */
  const { auth, ...params } = props;

  const btnStatus = useMemo(() => {
    if (auth) {
      if (!account.address) return BtnStatus.UNCONNECT;
      else if (!account.chain) return BtnStatus.WRONGNETWORK;
    }
    return BtnStatus.CORRECT;
  }, [account.address, account.chain, auth]);

  const btnContent = useMemo(() => {
    switch (btnStatus) {
      case BtnStatus.UNCONNECT:
        return t.account.connectWallet;
      case BtnStatus.WRONGNETWORK:
        return t.account.switchNetwork;
      default:
        return props.children;
    }
  }, [btnStatus, props.children, t]);

  const btnClickFun = useMemo(() => {
    switch (btnStatus) {
      case BtnStatus.UNCONNECT:
        return connect;
      case BtnStatus.WRONGNETWORK:
        return switchChain;
      default:
        return !props.isDisabled && !props.isLoading ? props.onClick : () => {};
    }
  }, [btnStatus, props.onClick]);

  /** Template */
  return (
    <>
      {/* 普通按钮 */}
      {!props.to && (
        <NButton
          {...params}
          isDisabled={btnStatus === BtnStatus.CORRECT && props.isDisabled}
          className={`
            h-fit flex-align-x px-0 outline-none 
            ${props.className} 
            ${btnStatus === BtnStatus.CORRECT && (props.isDisabled || props.isLoading) ? 'btn-disabled' : ''} 
          `}
          isLoading={false}
          onClick={btnClickFun}
        >
          {btnContent}

          {/* loading */}
          {props.isLoading && <Svg name="spin" className="xs:w-40 md:w-20 ml-10 animate-spin origin-center" />}

          {/* mask */}
          <span className="w-full h-full absolute bg-transparent hover:bg-white/10 duration-300"></span>
        </NButton>
      )}

      {/* 链接按钮 */}
      {props.to && (
        <Link
          href={props.to}
          className={`
            w-fit h-fit relative flex-align-x justify-center px-0 outline-none overflow-hidden
            ${props.className} 
            ${props.isDisabled || props.isLoading ? 'btn-disabled' : ''} 
          `}
        >
          {props.children}

          {/* loading */}
          {props.isLoading && <Svg name="spin" className="xs:w-40 md:w-20 ml-10 animate-spin origin-center" />}

          {/* mask */}
          <span className="w-full h-full absolute top-0 left-0 bg-transparent hover:bg-white/10 duration-300"></span>
        </Link>
      )}
    </>
  );
};
