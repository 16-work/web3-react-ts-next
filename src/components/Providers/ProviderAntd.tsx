'use client';
import { ReactNode, useMemo } from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { store } from '@/store';
import zhCN from 'antd/locale/zh_CN';
import zhTW from 'antd/locale/zh_TW';
import en from 'antd/locale/en_US';

interface Props {
  children: ReactNode;
}

/** Component */
export const ProviderAntd = (props: Props) => {
  /** Retrieval */
  const { language } = store.global();

  /** Params */
  const locale = useMemo(() => {
    switch (language) {
      case 'zh-CN':
        return zhCN;
      case 'zh-TW':
        return zhTW;
      default:
        return en;
    }
  }, [language]);

  /** Actions */

  /** Template */
  return (
    <AntdRegistry>
      <ConfigProvider locale={locale}>{props.children}</ConfigProvider>
    </AntdRegistry>
  );
};
