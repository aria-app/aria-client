import isNumber from 'lodash/fp/isNumber';
import PropTypes from 'prop-types';
import React from 'react';
import styled, { withTheme } from 'styled-components';

import { borderRadii, spacingAliases } from '../constants';

const Root = styled.div((props) => ({
  backgroundColor: {
    background: props.theme.palette.background.default,
    border: props.theme.palette.divider,
    error: props.theme.palette.error.main,
    info: props.theme.palette.info.main,
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
  width: toSpacing(props.width),
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
  const { children, component = 'div', ...rest } = props;

  return (
    <Root as={component} {...rest}>
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

/*
  props: {
    component: {
      default: 'div',
      type: String,
    },
    showInteractionOverlay: {
      default: false,
      type: Boolean,
    },
  },
  data: () => ({
    isKeyDown: false,
  }),
  computed: {
    classes() {
      return [
        'box',
        `box--background-color-${this.backgroundColor}`,
        `box--border-radius-${this.borderRadius}`,
        {
          'box--show-interaction-overlay': this.showInteractionOverlay,
        },
      ]
    },
    styles() {
      return omitBy(
        {
          margin: getRemFromSpacing(this.margin),
          marginBottom: getRemFromSpacing(this.marginBottom || this.marginY),
          marginLeft: getRemFromSpacing(this.marginLeft || this.marginX),
          marginRight: getRemFromSpacing(this.marginRight || this.marginX),
          marginTop: getRemFromSpacing(this.marginTop || this.marginY),
          padding: getRemFromSpacing(this.padding),
          paddingBottom: getRemFromSpacing(this.paddingBottom || this.paddingY),
          paddingLeft: getRemFromSpacing(this.paddingLeft || this.paddingX),
          paddingRight: getRemFromSpacing(this.paddingRight || this.paddingX),
          paddingTop: getRemFromSpacing(this.paddingTop || this.paddingY),
        },
        isNil,
      )
    },
  },
}

function getIsSpacingPropValid(propName) {
  return (value) => {
    const negativeSpacingAliases = map(
      without(spacingAliases, 'none'),
      (alias) => `-${alias}`,
    )
    const isValid =
      includes(['', ...spacingAliases, ...negativeSpacingAliases], value) ||
      !isNaN(parseFloat(value))

    if (!isValid) {
      // eslint-disable-next-line no-console
      console.error(
        `Box: Bad value "${value}". The "${propName}" prop must be a number to be multiplied by 4, or one of the following aliases:`,
        String([...spacingAliases, ...negativeSpacingAliases]),
      )
    }

    return isValid
  }
}

export function getRemFromSpacing(spacing) {
  if (isNumber(spacing) || !isNaN(parseFloat(spacing))) {
    return `${(spacing * 4) / 16}rem`
  }

  const pxToRem = (px) => px / 16

  return {
    '-gutter': `-${pxToRem(24)}rem`,
    '-large': `-${pxToRem(40)}rem`,
    '-medium': `-${pxToRem(16)}rem`,
    '-small': `-${pxToRem(12)}rem`,
    '-xlarge': `-${pxToRem(64)}rem`,
    '-xsmall': `-${pxToRem(8)}rem`,
    '-xxlarge': `-${pxToRem(128)}rem`,
    '-xxsmall': `-${pxToRem(4)}rem`,
    gutter: `${pxToRem(24)}rem`,
    large: `${pxToRem(40)}rem`,
    medium: `${pxToRem(16)}rem`,
    none: '0',
    small: `${pxToRem(12)}rem`,
    xlarge: `${pxToRem(64)}rem`,
    xsmall: `${pxToRem(8)}rem`,
    xxlarge: `${pxToRem(128)}rem`,
    xxsmall: `${pxToRem(4)}rem`,
  }[spacing]
}
</script>

<style scoped>
.box--background-color-black {
  @apply bg-black;
}
.box--background-color-blue {
  @apply bg-blue;
}
.box--background-color-border {
  @apply bg-border;
}
.box--background-color-error {
  @apply bg-error;
}
.box--background-color-gold {
  @apply bg-gold;
}
.box--background-color-green {
  @apply bg-green;
}
.box--background-color-info {
  @apply bg-info;
}
.box--background-color-offwhite {
  @apply bg-offwhite;
}
.box--background-color-orange {
  @apply bg-orange;
}
.box--background-color-pink {
  @apply bg-pink;
}
.box--background-color-purple {
  @apply bg-purple;
}
.box--background-color-subtle {
  @apply bg-subtle;
}
.box--background-color-success {
  @apply bg-success;
}
.box--background-color-warning {
  @apply bg-warning;
}
.box--border-radius-small {
  border-radius: 0.125rem;
}
.box--border-radius-medium {
  border-radius: 0.3125rem;
}
.box--border-radius-full {
  border-radius: 9999px;
}
.box--show-interaction-overlay {
  @apply cursor-pointer relative;
}
.box--show-interaction-overlay::after {
  @apply absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-100 ease-in-out;
  background-color: black;
  content: '';
}
.box--background-color-black.box--show-interaction-overlay::after,
.box--background-color-error.box--show-interaction-overlay::after,
.box--background-color-gold.box--show-interaction-overlay::after,
.box--background-color-info.box--show-interaction-overlay::after,
.box--background-color-subtle.box--show-interaction-overlay::after,
.box--background-color-success.box--show-interaction-overlay::after {
  background-color: white;
}
.box--background-color-black.box--show-interaction-overlay:hover::after,
.box--background-color-error.box--show-interaction-overlay:hover::after,
.box--background-color-gold.box--show-interaction-overlay:hover::after,
.box--background-color-info.box--show-interaction-overlay:hover::after,
.box--background-color-subtle.box--show-interaction-overlay:hover::after,
.box--background-color-success.box--show-interaction-overlay:hover::after {
  opacity: 0.2;
}
.box--background-color-black.box--show-interaction-overlay:active::after,
.box--background-color-error.box--show-interaction-overlay:active::after,
.box--background-color-gold.box--show-interaction-overlay:active::after,
.box--background-color-info.box--show-interaction-overlay:active::after,
.box--background-color-subtle.box--show-interaction-overlay:active::after,
.box--background-color-success.box--show-interaction-overlay:active::after {
  opacity: 0.4;
}
.box--background-color-blue.box--show-interaction-overlay::after,
.box--background-color-border.box--show-interaction-overlay::after,
.box--background-color-green.box--show-interaction-overlay::after,
.box--background-color-none.box--show-interaction-overlay::after,
.box--background-color-offwhite.box--show-interaction-overlay::after,
.box--background-color-orange.box--show-interaction-overlay::after,
.box--background-color-pink.box--show-interaction-overlay::after,
.box--background-color-purple.box--show-interaction-overlay::after,
.box--background-color-warning.box--show-interaction-overlay::after {
  background-color: black;
}
.box--background-color-blue.box--show-interaction-overlay:hover::after,
.box--background-color-border.box--show-interaction-overlay:hover::after,
.box--background-color-green.box--show-interaction-overlay:hover::after,
.box--background-color-none.box--show-interaction-overlay:hover::after,
.box--background-color-offwhite.box--show-interaction-overlay:hover::after,
.box--background-color-orange.box--show-interaction-overlay:hover::after,
.box--background-color-pink.box--show-interaction-overlay:hover::after,
.box--background-color-purple.box--show-interaction-overlay:hover::after,
.box--background-color-warning.box--show-interaction-overlay:hover::after {
  opacity: 0.1;
}
.box--background-color-blue.box--show-interaction-overlay:active::after,
.box--background-color-border.box--show-interaction-overlay:active::after,
.box--background-color-green.box--show-interaction-overlay:active::after,
.box--background-color-none.box--show-interaction-overlay:active::after,
.box--background-color-offwhite.box--show-interaction-overlay:active::after,
.box--background-color-orange.box--show-interaction-overlay:active::after,
.box--background-color-pink.box--show-interaction-overlay:active::after,
.box--background-color-purple.box--show-interaction-overlay:active::after,
.box--background-color-warning.box--show-interaction-overlay:active::after {
  opacity: 0.25;
} */
