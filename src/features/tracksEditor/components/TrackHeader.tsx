import { Box, BoxProps, Stack, Text, useThemeWithDefault } from 'aria-ui';
import { FC, memo } from 'react';

export const TrackHeader: FC<BoxProps<'div'>> = (props) => {
  const { children, ...rest } = props;
  const theme = useThemeWithDefault();

  return (
    <Box
      sx={{
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        textTransform: 'uppercase',
        transform: 'scale(1)',
        transition: 'transform 0.2s ease',
      }}
      {...rest}
    >
      <Stack align="center" direction="row" space={2}>
        <Box
          backgroundColor="brandPrimary"
          borderRadius="sm"
          sx={{
            height: 28,
            position: 'relative',
            width: 28,
            '&::after': {
              backgroundColor: theme.getForegroundColor('brandPrimary'),
              borderRadius: 9999,
              content: '""',
              display: 'block',
              height: 12,
              left: '50%',
              position: 'absolute',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 12,
            },
          }}
        />
        <Text
          color="brandContrast"
          sx={{
            fontWeight: 800,
            marginBottom: -0.5,
          }}
        >
          {children}
        </Text>
      </Stack>
    </Box>
  );
};
