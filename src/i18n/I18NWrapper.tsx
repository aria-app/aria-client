import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { ProviderProps, ReactElement } from 'react';
import {
  I18nextProvider,
  I18nextProviderProps,
  initReactI18next,
} from 'react-i18next';

import enTranslation from './locales/en/translation.json';
import jpTranslation from './locales/jp/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    keySeparator: false,
    lng: 'en',
    resources: {
      en: { translation: enTranslation },
      jp: { translation: jpTranslation },
    },
  });

export function I18NWrapper({
  children,
  i18n: i18nProp,
}: Partial<ProviderProps<any> & I18nextProviderProps>): ReactElement {
  return <I18nextProvider i18n={i18nProp || i18n}>{children}</I18nextProvider>;
}
