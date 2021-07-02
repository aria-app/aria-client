import { lightTheme, ThemeProvider as AriaUIThemeProvider } from 'aria-ui';
import { FC, ReactNode } from 'react';

export interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: FC<ThemeProviderProps> = (props) => {
  const { children } = props;

  return (
    <AriaUIThemeProvider theme={lightTheme}>{children}</AriaUIThemeProvider>
  );
};
