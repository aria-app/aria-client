import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { FC, ReactNode, useEffect } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import enTranslation from './locales/en/translation.json';
import jaTranslation from './locales/ja/translation.json';

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    keySeparator: false,
    lng: navigator ? navigator.languages[0] : 'en',
    resources: {
      en: { translation: enTranslation },
      ja: { translation: jaTranslation },
    },
  });

export interface I18NWrapperProps {
  children?: ReactNode;
  i18n?: typeof i18next;
  locale?: 'en' | 'ja';
}

export const I18NWrapper: FC<I18NWrapperProps> = (props) => {
  const { children, i18n = i18next, locale } = props;

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [i18n, locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
