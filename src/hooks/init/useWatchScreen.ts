import { store } from '@/store';
import { tools } from '@/utils/tools';
import { useEffect } from 'react';
import { SCREEN, screenMinSize } from '../../../config/tailwindcss/screen';

/** Hook */
export const useWatchScreen = () => {
  /** Retrieval */
  const { setIsPC, setScreenType } = store.global();

  /** Actions */
  useEffect(() => {
    const resize = () => {
      // 判断设备类型(PC/Mobile) & 屏幕类型
      setIsPC(window.innerWidth > screenMinSize[SCREEN.MD] && !isMobileDevice() ? true : false);
      setScreenType(tools.getScreenType()!);
    };
    resize(); // 初始检测

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  // 兼容safari 100vh
  useEffect(() => {
    const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
    if (isSafari) {
      const windowsVH = window.innerHeight / 100;
      const container = document.querySelector('#root') as HTMLElement;
      if (container) {
        container.style.setProperty('--vh', windowsVH + 'px');

        window.addEventListener('resize', function () {
          container.style.setProperty('--vh', windowsVH + 'px');
        });
      }
    }
  }, []);
};

/** Functions */
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};
