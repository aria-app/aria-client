import { Global } from '@emotion/react';
import { absoluteFill, Box, GlobalStyles } from 'aria-ui';
import { FC, HTMLAttributes, memo } from 'react';

export type ShellProps = HTMLAttributes<HTMLDivElement>;

export const Shell: FC<ShellProps> = memo((props) => {
  const { children, ...rest } = props;

  return (
    <Box
      sx={{
        ...absoluteFill,
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        label: 'Shell',
        overflow: 'hidden',
      }}
      {...rest}
    >
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
    </Box>
  );
});
