import { Global } from '@emotion/react';
import styled from '@emotion/styled';
import { GlobalStyles } from 'aria-ui';
import { FC, HTMLAttributes, memo } from 'react';

const Root = styled.div({
  bottom: 0,
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  left: 0,
  overflow: 'hidden',
  position: 'absolute',
  right: 0,
  top: 0,
});

export const Shell: FC<HTMLAttributes<HTMLDivElement>> = memo((props) => {
  const { children, ...rest } = props;

  return (
    <Root {...rest}>
      <GlobalStyles />
      <Global
        styles={{
          '*': {
            outline: 'none',
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
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      />
      {children}
    </Root>
  );
});
