'use client';

import { tools } from '@/utils/tools';
import { AnimationItem } from 'lottie-web';
import { useEffect, useMemo, useRef } from 'react';

/** Props */
interface Props {
  name: string;
  className: string;
  loop?: boolean;
  onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

/** Component */
export const Lottie = (props: Props) => {
  /** Params */
  const animationContainer = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null); // 新增ref保存动画实例

  const className = useMemo(() => {
    return tools.getAutoHeightClassName(props.className);
  }, [props.className]);

  /** Actions */
  useEffect(() => {
    const loadAnimation = async () => {
      try {
        const lottie = (await import('lottie-web')).default;
        const animationData = await import(`@/assets/lottie/${props.name}.json`);

        // 清理旧实例和容器内容
        if (animRef.current) {
          animRef.current.destroy();
          animRef.current = null;
        }
        if (animationContainer.current) {
          animationContainer.current.innerHTML = ''; // 清空容器
        }

        // 创建新实例
        if (animationContainer.current) {
          animRef.current = lottie.loadAnimation({
            container: animationContainer.current,
            renderer: 'svg',
            loop: props.loop ?? true,
            autoplay: true,
            animationData: animationData.default,
          });
        }
      } catch (err) {
        console.error('Error loading Lottie animation:', err);
      }
    };

    loadAnimation();

    return () => {
      // 确保卸载时清理
      if (animRef.current) {
        animRef.current.destroy();
        animRef.current = null;
      }
    };
  }, [props.name]);

  /** Template */
  return <div ref={animationContainer} className={className} />;
};
