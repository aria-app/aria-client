import { createMuiTheme } from "@material-ui/core/styles";

// Default theme reference: https://material-ui.com/customization/default-theme/
export const mui = createMuiTheme({
  palette: {
    type: "dark",
  },
  typography: {
    fontFamily: ["Open Sans", "Helvetica", "sans-serif"],
    useNextVariants: true,
  },
});
