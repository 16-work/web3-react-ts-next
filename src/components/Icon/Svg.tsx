'use client';

import { useMemo } from 'react';

/** 注意:
 * 把svg文件的width&height去掉,否则改不了宽高
 * 把svg文件的fill改成currentColor,否则改不了颜色
 */

/** Props */
interface Props {
  name: string;
  className: string; // 长/宽/颜色都写这(未设置height时自动和width一致)

  color?: string;
  fill?: string;
  style?: React.CSSProperties;
  onClick?: (e: any) => void;
}

/** Component */
export const Svg = (props: Props) => {
  /** Parmas */
  const className = useMemo(() => {
    // 未设置height时自动和width一致
    const regex = /\bh-(\d+|auto|full|screen)\b/;
    if (regex.test(props.className)) return props.className;
    else return props.className + ' aspect-square';
  }, [props.className]);

  /** Template */

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Icon = require(`@/assets/icons/${props.name}.svg`).default;

  return (
    <Icon
      className={className}
      style={{
        color: props.color,
        flexShrink: 0,
        ...props.style,
      }}
      onClick={(e: any) => props.onClick && props.onClick(e)}
    />
  );
};
