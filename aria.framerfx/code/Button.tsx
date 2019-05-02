import * as React from "react";
import { ControlType } from "framer";
import MuiButton from "@material-ui/core/Button";

export class Button extends React.Component<any> {
  render() {
    return <MuiButton variant="contained">{this.props.text}</MuiButton>;
  }

  static defaultProps = {
    text: "Click Me!"
  };

  static propertyControls = {
    text: { type: ControlType.String, title: "Text" }
  };
}
