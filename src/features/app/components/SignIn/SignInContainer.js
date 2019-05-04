import { connect } from "react-redux";
import user from "../../../user";
import { SignIn } from "./SignIn";

export const SignInContainer = connect(state => ({
  isAuthenticated: user.selectors.getIsAuthenticated(state),
}))(SignIn);
