import { darkTheme, GlobalStyles, lightTheme, ThemeProvider } from 'aria-ui';
import * as Tone from 'tone';

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
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
      <ThemeProvider
        theme={context.globals.theme === 'dark' ? darkTheme : lightTheme}
      >
        <GlobalStyles />
        {storyFn()}
      </ThemeProvider>
    );
  },
];

['keydown', 'mousedown', 'touchdown'].forEach((eventName) => {
  document.body.addEventListener(eventName, () => {
    Tone.start();
  });
});
