import { Box, Stack, Text, useThemeWithDefault } from 'aria-ui';
import { FC, MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';

import { Track } from '../../../types';

export interface TrackListTrackHeaderProps {
  onClick: MouseEventHandler;
  track: Track;
}

export const TrackListTrackHeader: FC<TrackListTrackHeaderProps> = (props) => {
  const { track, ...rest } = props;
  const theme = useThemeWithDefault();
  const { t } = useTranslation();

  return (
    <Box
      borderRadius="md"
      childColor="brandPrimary"
      isInteractive
      padding={1}
      sx={{
        alignItems: 'center',
        alignSelf: 'flex-start',
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
          {t(track.voice.name)}
        </Text>
      </Stack>
    </Box>
  );
};
