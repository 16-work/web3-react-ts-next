import { DEFAULT_THEME } from '@/constants/common';
import { languageConfig } from '@/constants/i18n/config';
import { localCache } from '@/utils/localCache';
import { SCREEN } from '@config/tailwindcss/screen';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { GlobalStore } from './types';

export const storeGlobal = create<GlobalStore>()(
  devtools(
    persist(
      (set) => ({
        theme: DEFAULT_THEME,
        setTheme: (theme) =>
          set((state) => {
            document.body.classList.remove(state.theme);
            document.body.classList.add(theme);
            return { theme };
          }),

        language: languageConfig.initLanguage,
        setLanguage: (language) =>
          set(() => {
            localCache.set('language', language);
            return { language };
          }),

        isPC: true,
        setIsPC: (bool) => set(() => ({ isPC: bool })),

        screenType: SCREEN.MD,
        setScreenType: (type) => set(() => ({ screenType: type })),

        isHitBottom: false,
        setIsHitBottom: (bool) => set(() => ({ isHitBottom: bool })),

        tasks: [],
        setTask: (params) =>
          set((state) => {
            if (!state.tasks[params.index]) {
              state.tasks[params.index] = { id: '', status: -1 };
            }
            if (params.id) state.tasks[params.index].id = params.id;
            if (typeof params.status === 'number') state.tasks[params.index].status = params.status;

            return { tasks: state.tasks };
          }),

        isOpenDrawer: false,
        setIsOpenDrawer: (bool) => set(() => ({ isOpenDrawer: bool })),

        usdtUnitPrice: '0',
        setUsdtUnitPrice: (value) => set(() => ({ usdtUnitPrice: value })),

        tokenIconList: {},
        setTokenIconList: (update) => set((state) => ({ tokenIconList: { ...state.tokenIconList, ...update } })),
      }),
      { name: 'global' }
    )
  )
);
