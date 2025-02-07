'use client';
import { DropList } from '@/components/Base/DropList';
import { Svg } from '@/components/Icon/Svg';
import { filterLanguage, languageConfig, supportLanguages } from '@/constants/i18n/config';
import { store } from '@/store';

const options = Object.entries(supportLanguages).map((item) => {
  return { label: item[1], value: item[0] };
});

/** Component */
export const SwitchLanguage = () => {
  /** Retrieval */
  const { language, setLanguage } = store.global();

  /** Actions */
  const onChangeLanguage = (value: string) => {
    setLanguage(filterLanguage(value));
  };

  /** Template */
  return (
    options.length > 1 && (
      <DropList
        value={language}
        options={options}
        onSelect={(value) => onChangeLanguage(value)}
        children={() => <Svg name="language" className="xs:w-60 md:w-30 hover-primary" />}
      />
    )
  );
};
