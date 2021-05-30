import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Shell, theme, ThemeProvider } from '../src/features/shared';
import { I18NWrapper } from '../src/i18n';

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🇺🇸', title: 'English' },
        { value: 'jp', right: '🇯🇵', title: '日本語' },
      ],
    },
  },
};

export const parameters = {
  backgrounds: {
    values: [
      { name: 'Default', value: theme.palette.background.default },
      { name: 'Paper', value: theme.palette.background.paper },
    ],
  },
  layout: 'centered',
};

export const decorators = [
  (Story) => {
    return (
      <I18NWrapper>
        <ThemeProvider>
          <Shell style={{ display: 'none' }} />
          <Story />
        </ThemeProvider>
      </I18NWrapper>
    );
  },
  (Story, context) => {
    const { i18n } = useTranslation();
    useEffect(() => {
      i18n.changeLanguage(context.globals.locale);
    }, [context.globals.locale]);

    return <Story />;
  },
];
