import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';
import { lightTheme } from 'aria-ui';
import { merge } from 'lodash';
import { ReactElement, ReactNode } from 'react';

import theme from '../theme';

export interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({
  children,
}: ThemeProviderProps): ReactElement {
  return (
    <StylesProvider injectFirst={true}>
      <MuiThemeProvider theme={theme}>
        <EmotionThemeProvider theme={merge(theme, lightTheme)}>
          {children}
        </EmotionThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}
