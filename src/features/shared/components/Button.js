import { useTheme } from '@emotion/react';
import React from 'react';

import Box from './Box';

export default React.forwardRef((props, ref) => {
  const {
    children,
    color = 'text.secondary',
    startIcon,
    sx = {},
    variant = 'outlined',
    ...rest
  } = props;
  const theme = useTheme();

  return (
    <Box
      component="button"
      interactive
      interactiveColor={variant === 'outlined' ? color : undefined}
      ref={ref}
      sx={{
        alignItems: 'center',
        backgroundColor: variant === 'outlined' ? 'transparent' : color,
        borderColor: color,
        borderRadius: 1,
        borderStyle: 'solid',
        borderWidth: variant === 'outlined' ? 2 : 0,
        color: color,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        minWidth: children ? 96 : 0,
        overflow: 'hidden',
        paddingX: children ? 4 : 3,
        paddingY: 3,
        position: 'relative',
        '& > * + *': {
          marginLeft: 3,
        },
        ...sx,
      }}
      {...rest}
    >
      {startIcon && (
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            margin: -1.5,
          }}
        >
          {startIcon}
        </Box>
      )}
      {children && (
        <Box
          sx={{
            ...theme.typography.button,
            marginBottom: -0.5,
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
});
