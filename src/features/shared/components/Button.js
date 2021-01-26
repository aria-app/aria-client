import Button from '@material-ui/core/Button';
import React from 'react';

export default React.forwardRef((props, ref) => {
  const { variant, sx = {}, ...rest } = props;

  return (
    <Button
      disableElevation
      ref={ref}
      size="large"
      sx={{
        fontSize: (theme) => theme.typography.button.fontSize,
        ...(variant === 'outlined'
          ? {
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
              },
            }
          : {}),
        ...sx,
      }}
      variant={variant}
      {...rest}
    />
  );
});
