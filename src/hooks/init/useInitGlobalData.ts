'use client';

import { api } from '@/api';
import { initDefaultLanguage, languageConfig } from '@/constants/i18n/config';
import { store } from '@/store';
import { localCache } from '@/utils/localCache';
import { useAsyncEffect, useRequest } from 'ahooks';
import { useEffect } from 'react';

/** Hook */
export const useInitGlobalData = () => {
  /** Retrieval */
  const { theme, setLanguage } = store.global();
  const { setUsdtUnitPrice, setTokenIconList } = store.global();

  /** Actions */
  useEffect(() => {
    // 初始化主题
    document.body.classList.add(theme);
    // 获取默认语言
    languageConfig.initLanguage = initDefaultLanguage();
    setLanguage(languageConfig.initLanguage);
  }, []);

  // 初始化token icons
  useAsyncEffect(async () => {
    const res = await api.token.fetchList({ page: 1, pageSize: 9999 });

    const list: Record<string, string> = {};
    for (let i = 0; i < res.list.length; i++) {
      list[res.list[i].contract.toLowerCase()] = res.list[i].icon;
    }

    setTokenIconList(list);
  }, []);

  // 轮询美元单价
  useRequest(
    async () => {
      /* main */
      const res = await api.common.fetchUSDTUnitPrice();

      /* success */
      setUsdtUnitPrice(String(res));
      localCache.set('usdtUnitPrice', String(res));
    },
    {
      pollingInterval: 1000 * 60 * 1, // 1min 刷新美元单价
    }
  );
};
