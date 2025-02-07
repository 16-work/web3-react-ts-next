import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { UserStore } from './types';

export const userStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        isShowVerifyTip: false,
        setIsShowVerifyTip: (bool) => set(() => ({ isShowVerifyTip: bool })),

        usersToken: {},
        setUsersToken: (address, token) =>
          set((state) => ({
            usersToken: {
              ...state.usersToken,
              [address]: token,
            },
          })),
      }),
      { name: 'user' }
    )
  )
);
