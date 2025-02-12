import { store } from '@/store';
import { BoxLogo } from './BoxLogo';
import { LayoutDrawer } from '../LayoutDrawer';
import { Svg } from '@/components/Icon/Svg';

/** Component */
export const NavScreenS = () => {
  /** Retrieval */
  const { setIsOpenDrawer } = store.global();

  /** Template */
  return (
    <>
      {/* left */}
      <BoxLogo />

      {/* right */}
      <div className="flex-align-x gap-20">
        <>
          <Svg name="more" className="w-50" onClick={() => setIsOpenDrawer(true)} />
          <LayoutDrawer />
        </>
      </div>
    </>
  );
};
