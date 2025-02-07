import { useInitGlobalData } from './useInitGlobalData';
import { useRouterFun } from './useRouterFun';
import { useWatchAccount } from './useWatchAccount';
import { useWatchScreen } from './useWatchScreen';
import { useWatchTransaction } from './useWatchTransaction';

/** Hook */
export const useInit = () => {
  useWatchScreen();
  useInitGlobalData();
  useRouterFun();
  useWatchAccount();
  useWatchTransaction();
};
