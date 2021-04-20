import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';
import React from 'react';

import theme from '../theme';

export default function ThemeProvider({ children }) {
  return (
    <StylesProvider injectFirst={true}>
      <MuiThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}
