'use client';

import { store } from '@/store';
import { SCREEN } from '@config/tailwindcss/screen';
import { NavScreenL } from './NavScreenL';
import { NavScreenS } from './NavScreenS';

/** Component */
export const LayoutNav = () => {
  /** Retrieval */
  const { screenType } = store.global();

  /** Params */

  /** Actions */

  /** Template */
  return (
    <div id="layout-nav-base" className="bg-white">
      <div id="layout-nav" className="bg-white">
        {/* 开发环境会闪正常，生产环境一般看不出来 */}
        {screenType >= SCREEN.MD ? <NavScreenL /> : <NavScreenS />}
      </div>
    </div>
  );
};
