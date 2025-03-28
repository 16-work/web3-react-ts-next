'use client';

import { api } from '@/api';
import { store } from '@/store';
import { useEffect, useMemo } from 'react';
import { Img } from './Img';
import { tools } from '@/utils/tools';

/** Props */
interface Props {
  className: string; // 长/宽都写这(未设置height时自动和width一致)

  // 显示图片：icon和contract 2选1
  src?: string;
  contract?: string;

  // 要用canvas读图片信息时开下anonymous，然后开发环境停用缓存
  crossOrigin?: 'anonymous' | 'use-credentials';
}

/** Component */
export const TokenIcon = (props: Props) => {
  /** Retrieval */
  const { tokenIconList, setTokenIconList } = store.global();

  /** Params */
  const { contract, ...params } = props;

  /** Actions */
  const checkIconByContract = async () => {
    // token已存在缓存列表中，则不操作
    if (!props.contract || tokenIconList[props.contract] === '' || tokenIconList[props.contract]) return;

    // token不存在缓存列表中，则从接口读取
    const res = await api.token.fetchList({ page: 1, pageSize: 1, contracts: [props.contract] });

    const list: Record<string, string> = {};
    if (res.list.length === 0) {
      list[props.contract] = '';
    } else {
      for (let i = 0; i < res.list.length; i++) {
        list[res.list[i].contract] = res.list[i].icon;
      }
    }

    setTokenIconList(list);
  };

  useEffect(() => {
    if (props.contract) checkIconByContract();
  }, [props.contract]);

  /** Template */
  return <Img {...params} className={`${props.className}`} src={props.src || tokenIconList[props.contract ?? '']} defaultImg="token" />;
};
