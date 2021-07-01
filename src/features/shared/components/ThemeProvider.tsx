import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import {
  StylesProvider,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';
import { lightTheme } from 'aria-ui';
import { merge } from 'lodash';
import { ReactElement, ReactNode } from 'react';

import theme from '../theme';

const tempTheme = {
  mixins: {
    absoluteFill: {
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
  },
};

export interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({
  children,
}: ThemeProviderProps): ReactElement {
  return (
    <StylesProvider injectFirst={true}>
      <MuiThemeProvider theme={theme}>
        <EmotionThemeProvider theme={merge(theme, lightTheme, tempTheme)}>
          {children}
        </EmotionThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  );
}
