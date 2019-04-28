import { createMuiTheme } from "@material-ui/core/styles";
// import { base } from "./base";

// Default theme reference: https://material-ui.com/customization/default-theme/
export const mui = createMuiTheme({
  palette: {
    // background: {
    //   paper: base.greystone
    // },
    // text: {
    //   primary: "#fff"
    // },
    type: "dark"
  },
  typography: {
    useNextVariants: true
  }
});
