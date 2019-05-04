import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs";
import { BoxDynamic } from "./BoxDynamic.story";

storiesOf("Box", module)
  .addDecorator(withKnobs)
  .add("Dynamic", () => <BoxDynamic />);
