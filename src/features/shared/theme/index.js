import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

// Default theme reference: https://material-ui.com/customization/default-theme/
export default createMuiTheme({
  palette: {
    primary: {
      light: '#9b9bf9',
      main: '#5944ff',
      dark: '#2f2a9b',
    },
    secondary: red,
    // type: 'dark',
  },
  typography: {
    fontFamily: ['Open Sans', 'Helvetica', 'sans-serif'],
  },
});
