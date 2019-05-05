import React from "react";
import { animated, useTransition } from "react-spring";

export default function FadeIn({ children, component, isVisible }) {
  const transition = useTransition(isVisible, null, {
    enter: { opacity: 1 },
    from: { opacity: 0 },
  });

  return transition.map(
    ({ item, key, props }) =>
      item &&
      React.createElement(
        component || animated.div,
        {
          style: props,
          key,
        },
        children,
      ),
  );
}
