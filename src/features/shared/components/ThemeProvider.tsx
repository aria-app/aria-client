import { lightTheme, ThemeProvider as AriaUIThemeProvider } from 'aria-ui';
import { ReactElement, ReactNode } from 'react';

export interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({
  children,
}: ThemeProviderProps): ReactElement {
  return (
    <AriaUIThemeProvider theme={lightTheme}>{children}</AriaUIThemeProvider>
  );
}
