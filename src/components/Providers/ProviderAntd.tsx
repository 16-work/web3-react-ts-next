import { ReactNode } from 'react';
import { AntdRegistry } from '@ant-design/nextjs-registry';

interface Props {
  children: ReactNode;
}

/** Component */
export const ProviderAntd = (props: Props) => {
  /** Retrieval */

  /** Params */

  /** Actions */

  /** Template */
  return <AntdRegistry>{props.children}</AntdRegistry>;
};
