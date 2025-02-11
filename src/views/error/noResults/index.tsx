'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { SearchSuggestions } from './components/SearchSuggestions';
import Link from 'next/link';
import { path } from '@/constants/path';
import { Svg } from '@/components/Icon/Svg';
import { InputSearch } from '@/components/Input/InputSearch';
import { router } from '@/hooks/init/useRouterFun';

/** Component */
export const PageNoResults = () => {
  /** Retrieval */
  const { t } = useTranslation();

  /** Template */
  return (
    <div className="w">
      {/* btn: back */}
      <div>
        <Link href={path.home}>
          <Svg name="arrow-left" className="xs:w-40 md:w-22 hover-primary" />
        </Link>
      </div>

      {/* main */}
      <div className="page-min-h xs:w-full md:w-840 relative flex-align-y justify-center mx-auto mt-26">
        {/* title */}
        <h3 className="mb-20 text-title-1 xs:text-40 md:text-34 text-center">
          {t.common.search}
          {t.common.results}
        </h3>

        {/* search bar */}
        <InputSearch value="" onSearch={() => {}} />

        {/* no exists */}
        <p className="mt-30 text-tip-1 font-lg text-center">{t.tip.noFound(`${router.query.get('keyword')}`)}</p>

        {/* suggestions */}
        <SearchSuggestions />
      </div>
    </div>
  );
};
