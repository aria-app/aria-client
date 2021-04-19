import { createMuiTheme } from '@material-ui/core/styles';

import breakpoints from './breakpoints';
import mixins from './mixins';
import palette from './palette';
import shadows from './shadows';
import transitions from './transitions';
import typography from './typography';
import zIndex from './zIndex';

const theme = createMuiTheme({
  breakpoints,
  direction: 'ltr',
  mixins,
  components: {},
  palette,
  shadows,
  typography,
  shape: {
    borderRadius: 4,
  },
  spacing: 4,
  transitions,
  zIndex,
});

type ThemeInterface = typeof theme;

declare module '@emotion/react' {
  // eslint-disable-next-line
  export interface Theme extends ThemeInterface {}
}

export default theme;
