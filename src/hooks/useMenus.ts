import { path } from '@/constants/path';
import { store } from '@/store';
import { useReactive } from '@/utils/ahooks';
import { SCREEN } from '@config/tailwindcss/screen';
import { useEffect, useMemo } from 'react';
import { router } from './init/useRouterFun';

/** Hook */
export const useMenus = () => {
  /** Retrieval */
  const { screenType } = store.global();

  /** Params */
  const state = useReactive({
    activeMenuId: '1',
  });

  const menus = useMemo(() => {
    const list = [
      {
        id: '1',
        label: 'Home',
        path: path.home,
        relatedRoutes: [path.home],
      },
      {
        id: '2',
        label: 'Test',
        path: path.noResults,
        relatedRoutes: [path.noResults],
      },
    ];

    if (screenType <= SCREEN.MD) {
      list.push(...[]);
    }

    return list;
  }, [screenType]);

  /** Actions */
  useEffect(() => {
    let id = '';
    menus.map((menu) => {
      const index = menu.relatedRoutes?.findIndex((item) => {
        if (item === path.home) return router.pathname === item;
        return router.pathname.search(item) !== -1;
      });

      if (index !== -1) id = menu.id;
    });

    state.activeMenuId = id;
  }, [router.pathname]);

  /** Return */
  return { menus, state };
};
