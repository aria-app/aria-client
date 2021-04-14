import { createMuiTheme } from '@material-ui/core/styles';

import breakpoints from './breakpoints';
import mixins from './mixins';
import palette from './palette';
import shadows from './shadows';
import transitions from './transitions';
import typography from './typography';
import zIndex from './zIndex';

export default createMuiTheme({
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
  // nprogress: { color: '#000' },
});
