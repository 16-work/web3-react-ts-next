import Link from 'next/link';
import { path } from '@/constants/path';
import { Svg } from '@/components/Icon/Svg';

/** Component */
export const BoxLogo = () => {
  /** Retrieval */

  /** Params */

  /** Actions */

  /** Template */
  return (
    <Link href={path.home} className="logo    flex-align-x cursor-pointer">
      {/* logo */}
      <Svg name="logo" className="logo-icon    xs:w-50 md:w-30" />

      {/* app name */}
      <span className="app-name    xs:ml-16 md:ml-6 font-xl bold">{process.env.NEXT_PUBLIC_APPNAME}</span>
    </Link>
  );
};
