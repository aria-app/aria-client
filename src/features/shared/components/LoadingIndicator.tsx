import { Box, BoxProps, Spinner, Stack, Text } from 'aria-ui';
import { forwardRef } from 'react';

export const LoadingIndicator = forwardRef<HTMLDivElement, BoxProps<'div'>>(
  (props, ref) => {
    const { children, ...rest } = props;

    return (
      <Box
        ref={ref}
        sx={{
          alignItems: 'center',
          bottom: 0,
          display: 'flex',
          flex: '1 1 auto',
          justifyContent: 'center',
          left: 0,
          position: 'absolute',
          right: 0,
          top: 0,
        }}
        {...rest}
      >
        <Stack align="center" space={8}>
          <Spinner size="lg" />
          <Text variant="helper">{children}</Text>
        </Stack>
      </Box>
    );
  },
);
