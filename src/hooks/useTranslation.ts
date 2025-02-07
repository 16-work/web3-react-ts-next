import { languageConfig, supportLanguages } from '@/constants/i18n/config';
import { lang } from '@/constants/i18n/lang';
import { store } from '@/store';
import { useMemo } from 'react';

export const useTranslation = () => {
  const { language } = store.global();

  const t = useMemo(() => {
    const currentLang = // @ts-ignore
      (Object.keys(supportLanguages).includes(language) ? lang[language] : lang[languageConfig.defaultLanguage]) as (typeof lang)['en'];

    return currentLang;
  }, [language]);

  return {
    t,
  };
};
