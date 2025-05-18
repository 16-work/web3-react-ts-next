'use client';

import { store } from '@/store';
import { useReactive } from '@/utils/ahooks';
import { tools } from '@/utils/tools';
import { useEffect, useMemo, useRef } from 'react';
import NextImage from 'next/image';

// 注意：没有骨架屏版的Img

/** Props */
interface Props {
  /** 如果是本地图片，直接写/images/... */
  src: string; //
  /** 注：1.至少要有w；2.无h(或aspect)时，默认h=w */
  className: string;

  defaultImg?: 'empty' | 'token'; // 默认图片
  alt?: string;
  onClick?: () => void;

  // 要用canvas读图片信息时开下anonymous，然后开发环境停用缓存
  crossOrigin?: 'anonymous' | 'use-credentials';
}

/** Component */
export const Image = (props: Props) => {
  /** Retrieval */

  /** Params */
  const { defaultImg, className, ...params } = props;

  const imgRef = useRef<any>(null);

  const state = useReactive({
    isLoading: false,
    isError: false,
  });

  const defaultImgURL = useMemo(() => {
    if (!props.defaultImg || props.defaultImg === 'empty') return '';
    else if (props.defaultImg === 'token') return '/images/common/default-token.png';
    else return props.defaultImg;
  }, [props.defaultImg]);

  const sizeClassName = useMemo(() => {
    // 读取w、h、rounded相关属性
    const className =
      props.className.match(/\b(?:[\w-]+:)*?(w|h|absolute|reactive|fixed|top|bottom|left|right|position|m|rounded|shadow|aspect)\S*/g)?.join(' ') ?? '';

    // 无高度则默认h=w
    return tools.getAutoHeightClassName(className);
  }, [props.className]);

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
        <NextImage
          {...params}
          ref={imgRef}
          alt={params.alt ?? ''}
          width={0}
          height={0}
          sizes="100vw"
          className={`img-correct    ${state.isLoading ? `w-0 h-0 opacity-0` : `shrink-0 ${tools.getAutoHeightClassName(props.className)}`}`}
          onClick={props.onClick}
        />
      )}
    </>
  );
};
