import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import Box from './Box';

const Root = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  bottom: 0,
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  left: 0,
  overflow: 'hidden',
  position: 'absolute',
  right: 0,
  top: 0,
}));

const GlobalStyles = createGlobalStyle(({ theme }) => ({
  '*': {
    margin: 0,
    outline: 'none',
    padding: 0,
    boxSizing: 'border-box',
    WebkitFocusRingColor: 'transparent',
    WebkitTapHighlightColor: 'transparent',
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    KhtmlUserSelect: 'none',
    MozUserSelect: 'none',
    MsUserSelect: 'none',
    userSelect: 'none',
  },
  'html, body': {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: 'hidden',
  },
  body: {
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.fontSize,
  },
  '::-webkit-scrollbar': {
    display: 'none',
  },
}));

function Shell(props) {
  const { children, ...rest } = props;

  return (
    <Root backgroundColor="background" {...rest}>
      <GlobalStyles />
      {children}
    </Root>
  );
}

export default React.memo(Shell);
