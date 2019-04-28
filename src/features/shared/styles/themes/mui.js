import { createMuiTheme } from "@material-ui/core/styles";
// import { base } from "./base";

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
