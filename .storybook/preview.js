import { darkTheme, GlobalStyles, lightTheme, ThemeProvider } from 'aria-ui';
import * as Tone from 'tone';

import { I18NWrapper } from '../src/i18n/I18NWrapper';
console.log(navigator.languages);
export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: navigator ? navigator.languages[0] : 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🇺🇸', title: 'English' },
        { value: 'ja', right: '🇯🇵', title: '日本語' },
      ],
    },
  },
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
      showName: true,
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      date: /Date$/,
    },
  },
  layout: 'centered',
};

export const decorators = [
  (storyFn, context) => {
    return (
      <I18NWrapper locale={context.globals.locale}>
        <ThemeProvider
          theme={context.globals.theme === 'dark' ? darkTheme : lightTheme}
        >
          <GlobalStyles />
          {storyFn()}
        </ThemeProvider>
      </I18NWrapper>
    );
  },
];

['keydown', 'mousedown', 'touchdown'].forEach((eventName) => {
  document.body.addEventListener(eventName, () => {
    Tone.start();
  });
});
