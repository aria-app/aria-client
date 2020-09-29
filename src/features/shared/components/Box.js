import includes from 'lodash/fp/includes';
import isNumber from 'lodash/fp/isNumber';
import PropTypes from 'prop-types';
import React from 'react';
import styled, { withTheme } from 'styled-components';

import { borderRadii, spacingAliases } from '../constants';

const isDarkColor = (color) =>
  includes(color, ['error', 'primary', 'subtle', 'success', 'text']);

const Root = styled.div((props) => ({
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
  borderRadius: {
    small: `${2 / 16}rem`,
    medium: `${6 / 16}rem`,
    full: '9999px',
  }[props.borderRadius],
  cursor: props.isInteractionOverlayVisible && 'pointer',
  height: toSpacing(props.height),
  margin: toSpacing(props.margin),
  marginBottom: toSpacing(props.marginBottom || props.marginY),
  marginLeft: toSpacing(props.marginLeft || props.marginX),
  marginRight: toSpacing(props.marginRight || props.marginX),
  marginTop: toSpacing(props.marginTop || props.marginY),
  padding: toSpacing(props.padding),
  paddingBottom: toSpacing(props.paddingBottom || props.paddingY),
  paddingLeft: toSpacing(props.paddingLeft || props.paddingX),
  paddingRight: toSpacing(props.paddingRight || props.paddingX),
  paddingTop: toSpacing(props.paddingTop || props.paddingY),
  position: props.isInteractionOverlayVisible && 'relative',
  width: toSpacing(props.width),
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
  borderRadius: PropTypes.oneOf(borderRadii),
  component: PropTypes.elementType,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isInteractionOverlayVisible: PropTypes.bool,
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
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  theme: PropTypes.object,
};

function Box(props) {
  const {
    backgroundColor = 'none',
    children,
    component = 'div',
    ...rest
  } = props;

  return (
    <Root as={component} backgroundColor={backgroundColor} {...rest}>
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
    '-gutter': `-${pxToRem(24)}rem`,
    '-large': `-${pxToRem(32)}rem`,
    '-medium': `-${pxToRem(20)}rem`,
    '-small': `-${pxToRem(12)}rem`,
    '-xlarge': `-${pxToRem(48)}rem`,
    '-xsmall': `-${pxToRem(8)}rem`,
    '-xxlarge': `-${pxToRem(96)}rem`,
    '-xxsmall': `-${pxToRem(4)}rem`,
    gutter: `${pxToRem(24)}rem`,
    large: `${pxToRem(32)}rem`,
    medium: `${pxToRem(20)}rem`,
    small: `${pxToRem(12)}rem`,
    xlarge: `${pxToRem(48)}rem`,
    xsmall: `${pxToRem(8)}rem`,
    xxlarge: `${pxToRem(96)}rem`,
    xxsmall: `${pxToRem(4)}rem`,
  }[spacing];
}

export default withTheme(Box);
