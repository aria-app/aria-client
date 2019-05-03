import * as React from "react";
import { ControlType } from "framer";
import MuiButton from "@material-ui/core/Button";

export class Button extends React.Component<any> {
  render() {
    return <MuiButton style={{
      backgroundColor: this.props.backgroundColor,
    }} variant={this.props.variant}>{this.props.text}</MuiButton>;
  }

  static defaultProps = {
    text: "Click Me!"
  };

  static propertyControls = {
    backgroundColor: {
      type: ControlType.Color,
      title: "Background Color",
      defaultValue: "#fff",
    },
    text: { type: ControlType.String, title: "Text" },
    variant: {
      type: ControlType.Enum,
      defaultValue: "text",
      options: ["text", "outlined", "raised"],
      optionTitles: ["Text", "Outlined", "Raised"],
    }
  };
}
