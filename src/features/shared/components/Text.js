import styled from '@emotion/styled';
import React from 'react';

const Root = styled.span((props) => ({
  color: {
    background: props.theme.palette.background.default,
    border: props.theme.palette.divider,
    error: props.theme.palette.error.main,
    paper: props.theme.palette.background.paper,
    primary: props.theme.palette.primary.main,
    subtle: props.theme.palette.text.secondary,
    success: props.theme.palette.success.main,
    text: props.theme.palette.text.primary,
    warning: props.theme.palette.warning.main,
  }[props.color],
  fontSize: {
    body: `${16 / 16}rem`,
    bodySmall: `${12 / 16}rem`,
    display: `${96 / 16}rem`,
    headline: `${24 / 16}rem`,
    label: `${16 / 16}rem`,
  }[props.variant],
  fontWeight: {
    body: 400,
    bodySmall: 400,
    display: 600,
    headline: 400,
    label: 600,
  }[props.variant],
  lineHeight: {
    body: 1,
    bodySmall: 1,
    display: 1,
    headline: 1,
    label: 1,
  }[props.variant],
}));

export default function Text(props) {
  const { children, component = 'span', ...rest } = props;

  return (
    <Root as={component} {...rest}>
      {children}
    </Root>
  );
}
