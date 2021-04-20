import { useTheme } from '@emotion/react';
import React from 'react';

import Box from './Box';

export default React.forwardRef((props: any, ref) => {
  const {
    children,
    color = 'text.secondary',
    disabled,
    startIcon,
    sx = {},
    variant = 'outlined',
    ...rest
  } = props;
  const theme = useTheme();

  return (
    <Box
      component="button"
      disabled={disabled}
      interactive={!disabled}
      interactiveColor={
        ['outlined', 'text'].includes(variant) ? color : undefined
      }
      ref={ref}
      sx={{
        alignItems: 'center',
        backgroundColor: ['outlined', 'text'].includes(variant)
          ? 'transparent'
          : color,
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
        '&[disabled]': {
          cursor: 'not-allowed',
          opacity: 0.5,
        },
        '& > * + *': {
          marginLeft: 4,
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
            margin: ['contained', 'outlined'].includes(variant) ? -1.5 : -1,
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
