import { useTheme } from '@emotion/react';
import { ButtonProps as MuiButtonProps } from '@material-ui/core/Button';
import { forwardRef } from 'react';

import { Box } from './Box';

export type ButtonVariant = 'contained' | 'outlined' | 'text';

export interface ButtonProps extends Omit<MuiButtonProps, 'color'> {
  color?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
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

    const isContainedOrOutline =
      variant === 'contained' || variant === 'outlined';

    const isOutlinedOrText = variant === 'outlined' || variant === 'text';

    return (
      <Box
        component="button"
        disabled={disabled}
        interactive={!disabled}
        interactiveColor={isOutlinedOrText ? color : undefined}
        ref={ref}
        sx={{
          alignItems: 'center',
          backgroundColor: isOutlinedOrText ? 'transparent' : color,
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
              margin: isContainedOrOutline ? -1.5 : -1,
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
  },
);
