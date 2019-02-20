import React from 'react';
import { animated, useTransition } from 'react-spring';

export const Transitioner = ({ children, component, isVisible }) => {
  const transition = useTransition(isVisible, null, {
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return transition.map(({ item, key, props }) => (item &&
    React.createElement(component || animated.div, {
      style: props,
      key,
    }, children)
  ));
}
