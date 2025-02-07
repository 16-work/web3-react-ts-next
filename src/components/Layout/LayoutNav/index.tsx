'use client';

import { store } from '@/store';
import { SCREEN } from '@config/tailwindcss/screen';
import { NavScreenL } from './NavScreenL';
import { NavScreenS } from './NavScreenS';
import { useEffect, useState } from 'react';

/** Component */
export const LayoutNav = () => {
  /** Retrieval */
  const { screenType } = store.global();

  /** Params */
  const [mounted, setMounted] = useState(false);

  /** Actions */
  // 防止wagmi报Hydration failed
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  /** Template */
  return (
    <div id="layout-nav-base" className="bg-white">
      <div id="layout-nav" className="bg-white">
        {screenType >= SCREEN.MD ? <NavScreenL /> : <NavScreenS />}
      </div>
    </div>
  );
};
