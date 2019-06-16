import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';

// Default theme reference: https://material-ui.com/customization/default-theme/
export default createMuiTheme({
  palette: {
    primary: {
      light: '#9b9bf9',
      main: '#5944ff',
      dark: '#2f2a9b',
    },
    secondary: teal,
  },
  typography: {
    fontFamily: ['Open Sans', 'Helvetica', 'sans-serif'],
    useNextVariants: true,
  },
});
