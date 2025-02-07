'use client';
import { useInit } from '@/hooks/init';
import { store } from '@/store';
import { ReactNode } from 'react';
import { Scrollbar } from '../Base/Scrollbar';
import { LayoutFooter } from './LayoutFooter';
import { LayoutNav } from './LayoutNav';

/** Props */
interface Props {
  children: ReactNode;
}

/** Component */
export const Layout = (props: Props) => {
  /** Retrieval */
  const { setIsHitBottom } = store.global();

  /** Params */

  /** Actions */
  useInit();

  /** Template */
  return (
    <div id="layout">
      <Scrollbar id="layout-scroll" autoHeight={false} onHitBottom={(v) => setIsHitBottom(v)}>
        {/* nav */}
        <LayoutNav />

        {/* main */}
        <div id="layout-main">{props.children}</div>

        {/* footer */}
        <LayoutFooter />
      </Scrollbar>
    </div>
  );
};
