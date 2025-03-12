'use client';

import { store } from '@/store';
import { useReactive } from '@/utils/ahooks';
import { tools } from '@/utils/tools';
import { useEffect, useMemo, useRef } from 'react';

/** Props */
interface Props {
  /** 如果是本地图片，直接写images/... */
  src: string; //
  /** 注：1.至少要有w；2.无h(或aspect)时，默认h=w */
  className: string;

  defaultImg?: 'empty' | 'token'; // 默认图片
  skeletonType?: 'light' | 'dark'; // 骨架屏样式类型
  hideSkeleton?: boolean; // 是否隐藏骨架屏
  alt?: string;

  // 要用canvas读图片信息时开下anonymous，然后开发环境停用缓存
  crossOrigin?: 'anonymous' | 'use-credentials';
}

/** Component */
export const Img = (props: Props) => {
  /** Retrieval */
  const { theme } = store.global();

  /** Params */
  const { defaultImg, skeletonType, hideSkeleton, className, ...params } = props;

  const imgRef = useRef<any>(null);

  const state = useReactive({
    isLoading: true,
    isError: false,
  });

  const defaultImgURL = useMemo(() => {
    if (!props.defaultImg || props.defaultImg === 'empty') return '';
    else if (props.defaultImg === 'token') return 'images/common/default-token.png';
    else return props.defaultImg;
  }, [props.defaultImg]);

  const sizeClassName = useMemo(() => {
    // 读取w、h、rounded相关属性
    const className = props.className.match(/\b(?:[\w-]+:)*?(w|h|absolute|reactive|fixed|m|rounded|shadow|aspect)\S*/g)?.join(' ') ?? '';

    // 无高度则默认h=w
    return tools.getAutoHeightClassName(className);
  }, [props.className]);

  const skeleton = useMemo(() => {
    const type = (props.skeletonType ?? theme.search('light') !== -1) ? 'dark' : 'light';
    return `skeleton-${type}`;
  }, [props.skeletonType, theme]);

  /** Actions */
  useEffect(() => {
    const imgElement = imgRef.current;
    if (!imgElement) return;

    if (imgElement.complete) {
      if (imgElement.naturalWidth === 0 || imgElement.naturalHeight === 0) {
        state.isError = true;
        imgElement.src = defaultImgURL;
      }
      state.isLoading = false;
    } else {
      imgElement.onload = () => {
        state.isLoading = false;
      };

      imgElement.onerror = () => {
        state.isError = true;
        imgElement.src = defaultImgURL;
      };
    }
  }, [imgRef.current]);

  /** Template */
  return (
    <>
      {/* img: empty */}
      {!state.isLoading && !defaultImgURL && state.isError && (
        <span
          className={`img-error    inline-block shrink-0 bg-transparent
            ${sizeClassName} 
          `}
        ></span>
      )}

      {/* img */}
      {(!state.isError || (state.isError && defaultImgURL)) && (
        <div className={`inline-block ${sizeClassName}`}>
          <img
            {...params}
            ref={imgRef}
            className={`img-correct    ${state.isLoading ? `w-0 h-0 opacity-0` : `shrink-0 ${tools.getAutoHeightClassName(props.className)}`}`}
          />

          {state.isLoading && <span className={`img-loading    inline-block shrink-0 ${skeleton} ${sizeClassName}`}></span>}
        </div>
      )}
    </>
  );
};
