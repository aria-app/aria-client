import { useTheme } from '@emotion/react';
import Box from '@material-ui/core/Box';
import React from 'react';

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
        minWidth: 96,
        overflow: 'hidden',
        paddingX: 4,
        paddingY: 3,
        position: 'relative',
        '&:after': {
          ...theme.mixins.absoluteFill,
          backgroundColor: 'transparent',
          content: '""',
          display: 'block',
          pointerEvents: 'none',
          transition: 'background-color 100ms ease-in-out',
        },
        '&:hover:after': {
          backgroundColor: 'action.hover',
        },
        '&:active:after': {
          backgroundColor: 'action.active',
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
            marginRight: 3,
            marginY: -1.5,
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
