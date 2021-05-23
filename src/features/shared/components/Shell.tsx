import { Global, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

const Root = styled.div(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
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

function Shell(props: any) {
  const { children, ...rest } = props;
  const theme = useTheme();

  return (
    <Root {...rest}>
      <Global
        styles={{
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
        }}
      />
      {children}
    </Root>
  );
}

export default React.memo(Shell);