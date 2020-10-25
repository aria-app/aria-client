import { motion } from 'framer-motion';
import includes from 'lodash/fp/includes';
import isNumber from 'lodash/fp/isNumber';
import PropTypes from 'prop-types';
import React from 'react';
import styled, { withTheme } from 'styled-components';

import { borderRadii, spacingAliases } from '../constants';

const isDarkColor = (color) =>
  includes(color, ['error', 'primary', 'subtle', 'success', 'text']);

const Root = styled(motion.div)((props) => ({
  backgroundColor: {
    background: props.theme.palette.background.default,
    border: props.theme.palette.divider,
    error: props.theme.palette.error.main,
    paper: props.theme.palette.background.paper,
    primary: props.theme.palette.primary.main,
    subtle: props.theme.palette.text.secondary,
    success: props.theme.palette.success.main,
    text: props.theme.palette.text.primary,
    warning: props.theme.palette.warning.main,
  }[props.backgroundColor],
  borderColor: {
    background: props.theme.palette.background.default,
    border: props.theme.palette.divider,
    error: props.theme.palette.error.main,
    paper: props.theme.palette.background.paper,
    primary: props.theme.palette.primary.main,
    subtle: props.theme.palette.text.secondary,
    success: props.theme.palette.success.main,
    text: props.theme.palette.text.primary,
    warning: props.theme.palette.warning.main,
  }[props.borderColor],
  borderWidth: props.borderWidth,
  borderBottomWidth: props.borderBottomWidth,
  borderLeftWidth: props.borderLeftWidth,
  borderRadius: {
    small: `${2 / 16}rem`,
    medium: `${6 / 16}rem`,
    full: '9999px',
  }[props.borderRadius],
  borderRightWidth: props.borderRightWidth,
  borderStyle: props.borderColor !== 'none' && 'solid',
  borderTopWidth: props.borderTopWidth,
  bottom: toSpacing(props.bottom),
  cursor: props.isInteractionOverlayVisible && 'pointer',
  height: toSpacing(props.size) || toSpacing(props.height),
  left: toSpacing(props.left),
  margin: toSpacing(props.margin),
  marginBottom: toSpacing(props.marginBottom || props.marginY),
  marginLeft: toSpacing(props.marginLeft || props.marginX),
  marginRight: toSpacing(props.marginRight || props.marginX),
  marginTop: toSpacing(props.marginTop || props.marginY),
  overflow: props.isInteractionOverlayVisible && 'hidden',
  padding: toSpacing(props.padding),
  paddingBottom: toSpacing(props.paddingBottom || props.paddingY),
  paddingLeft: toSpacing(props.paddingLeft || props.paddingX),
  paddingRight: toSpacing(props.paddingRight || props.paddingX),
  paddingTop: toSpacing(props.paddingTop || props.paddingY),
  position: props.position || (props.isInteractionOverlayVisible && 'relative'),
  right: toSpacing(props.right),
  top: toSpacing(props.top),
  width: toSpacing(props.size) || toSpacing(props.width),
  '::after': {
    backgroundColor: isDarkColor(props.backgroundColor) ? 'white' : 'black',
    bottom: 0,
    content: '""',
    display: props.isInteractionOverlayVisible ? 'block' : 'none',
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    top: 0,
    opacity: 0,
    transition: 'opacity 100ms ease',
  },
  ':hover::after': {
    opacity: isDarkColor(props.backgroundColor) ? 0.2 : 0.1,
  },
  ':active::after': {
    opacity: isDarkColor(props.backgroundColor) ? 0.4 : 0.25,
  },
}));

export const spacingPropType = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.oneOf(spacingAliases),
]);

Box.propTypes = {
  backgroundColor: PropTypes.string,
  borderBottomWidth: PropTypes.number,
  borderColor: PropTypes.string,
  borderLeftWidth: PropTypes.number,
  borderRadius: PropTypes.oneOf(borderRadii),
  borderRightWidth: PropTypes.number,
  borderTopWidth: PropTypes.number,
  borderWidth: PropTypes.number,
  bottom: spacingPropType,
  component: PropTypes.elementType,
  height: spacingPropType,
  isInteractionOverlayVisible: PropTypes.bool,
  left: spacingPropType,
  margin: spacingPropType,
  marginBottom: spacingPropType,
  marginLeft: spacingPropType,
  marginRight: spacingPropType,
  marginTop: spacingPropType,
  marginX: spacingPropType,
  marginY: spacingPropType,
  padding: spacingPropType,
  paddingBottom: spacingPropType,
  paddingLeft: spacingPropType,
  paddingRight: spacingPropType,
  paddingTop: spacingPropType,
  paddingX: spacingPropType,
  paddingY: spacingPropType,
  position: PropTypes.string,
  right: spacingPropType,
  size: spacingPropType,
  top: spacingPropType,
  width: spacingPropType,
  theme: PropTypes.object,
};

function Box(props) {
  const {
    backgroundColor = 'none',
    borderColor = 'none',
    borderWidth = 0,
    children,
    component = 'div',
    ...rest
  } = props;

  return (
    <Root
      as={component}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderWidth={borderWidth}
      {...rest}
    >
      {children}
    </Root>
  );
}

export function toSpacing(spacing) {
  const pxToRem = (px) => px / 16;

  if (isNumber(spacing)) {
    return `${pxToRem(spacing * 8)}rem`;
  }

  return {
    auto: 'auto',
    full: '100%',
    none: '',
    '-large': `-${pxToRem(32)}rem`,
    '-medium': `-${pxToRem(16)}rem`,
    '-small': `-${pxToRem(12)}rem`,
    '-xlarge': `-${pxToRem(48)}rem`,
    '-xsmall': `-${pxToRem(8)}rem`,
    '-xxlarge': `-${pxToRem(96)}rem`,
    '-xxsmall': `-${pxToRem(4)}rem`,
    large: `${pxToRem(32)}rem`,
    medium: `${pxToRem(16)}rem`,
    small: `${pxToRem(12)}rem`,
    xlarge: `${pxToRem(48)}rem`,
    xsmall: `${pxToRem(8)}rem`,
    xxlarge: `${pxToRem(96)}rem`,
    xxsmall: `${pxToRem(4)}rem`,
  }[spacing];
}

export default withTheme(Box);
