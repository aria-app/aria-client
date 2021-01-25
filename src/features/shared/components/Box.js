import { Box as ChakraBox, forwardRef } from '@chakra-ui/react';
import { isValidMotionProp, motion } from 'framer-motion';
import includes from 'lodash/fp/includes';
import PropTypes from 'prop-types';
import React from 'react';

import { spacingAliases } from '../constants';

const MotionBox = motion.custom(
  forwardRef((props, ref) => {
    const chakraProps = Object.fromEntries(
      // do not pass framer props to DOM element
      Object.entries(props).filter(([key]) => !isValidMotionProp(key)),
    );
    return <ChakraBox ref={ref} {...chakraProps} />;
  }),
);

const isDarkColor = (color) =>
  includes(color, ['error', 'primary', 'subtle', 'success', 'text']);

export const spacingPropType = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.oneOf(spacingAliases),
]);

Box.propTypes = {
  isInteractionOverlayVisible: PropTypes.bool,
};

export default function Box(props) {
  const {
    backgroundColor,
    cursor,
    isInteractionOverlayVisible,
    overflow,
    position,
    ...rest
  } = props;

  return (
    <MotionBox
      _active={{
        '&:after': {
          opacity: isDarkColor(backgroundColor) ? 0.4 : 0.25,
        },
      }}
      _after={{
        backgroundColor: isDarkColor(backgroundColor) ? 'white' : 'black',
        bottom: 0,
        content: '""',
        display: isInteractionOverlayVisible ? 'block' : 'none',
        left: 0,
        pointerEvents: 'none',
        position: 'absolute',
        right: 0,
        top: 0,
        opacity: 0,
        transition: 'opacity 100ms ease',
      }}
      _hover={{
        '&:not(:active):after': {
          opacity: isDarkColor(backgroundColor) ? 0.2 : 0.1,
        },
      }}
      backgroundColor={backgroundColor}
      cursor={cursor || (isInteractionOverlayVisible && 'pointer')}
      overflow={overflow || (isInteractionOverlayVisible && 'hidden')}
      position={position || (isInteractionOverlayVisible && 'relative')}
      {...rest}
    />
  );
}
