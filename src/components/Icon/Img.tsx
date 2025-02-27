'use client';

import { store } from '@/store';
import { useReactive } from '@/utils/ahooks';
import { useEffect, useMemo, useRef } from 'react';

/** Props */
interface Props {
  src: string; // 本地的直接写路径(eg. images/...)
  className: string;

  preview?: boolean; // 是否预览
  defaultImg?: 'empty' | 'token'; // 默认图片
  skeletonType?: 'light' | 'dark';
  hideSkeleton?: boolean; // 是否隐藏骨架屏
  alt?: string;
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
    return props.className.match(/\b(w|h|absolute|reactive|fixed|m|rounded|shadow|aspect-square)\S*/g)?.join(' ');
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
        <div className={`${sizeClassName}`}>
          <img {...params} ref={imgRef} className={state.isLoading ? `w-0 h-0 opacity-0` : `inline-block shrink-0 ${props.className}`} />

          {state.isLoading && <span className={`inline-block w-full h-full shrink-0 ${skeleton} ${sizeClassName}`}></span>}
        </div>
      )}
    </>
  );
};
