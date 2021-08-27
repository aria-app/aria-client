import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import enTranslation from './locales/en/translation.json';
import jaTranslation from './locales/ja/translation.json';

export interface I18NWrapperProps {
  children?: ReactNode;
  i18n?: typeof i18next;
  locale?: 'en' | 'ja';
}

export const I18NWrapper: FC<I18NWrapperProps> = (props) => {
  const { children, i18n = i18next, locale } = props;
  const { locale: currentLocale } = useRouter();

  useEffect(() => {
    i18next
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        fallbackLng: 'en',
        keySeparator: false,
        lng: currentLocale || 'en',
        resources: {
          en: { translation: enTranslation },
          ja: { translation: jaTranslation },
        },
      });
    i18n.changeLanguage(locale);
  }, [currentLocale, i18n, locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
