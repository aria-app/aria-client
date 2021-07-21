import { Box, IconButton, Stack, Text } from 'aria-ui';
import formatDistance from 'date-fns/formatDistance';
import parseISO from 'date-fns/parseISO';
import CloseIcon from 'mdi-react/CloseIcon';
import { FC, useCallback, useMemo } from 'react';

import { SongListSong } from '../../../types';

export interface SongListItemProps {
  onDelete: (song: SongListSong) => void;
  onOpen: (song: SongListSong) => void;
  song: SongListSong;
}

export const SongListItem: FC<SongListItemProps> = (props) => {
  const { onDelete, onOpen, song } = props;

  const handleDeleteClick = useCallback(
    (e) => {
      e.stopPropagation();

      onDelete(song);
    },
    [onDelete, song],
  );

  const handleClick = useCallback(() => {
    onOpen(song);
  }, [onOpen, song]);

  const updatedText = useMemo(() => {
    const distanceInTime = formatDistance(
      parseISO(song.updatedAt),
      new Date(),
      { addSuffix: true },
    );

    return `Updated ${distanceInTime}`;
  }, [song]);

  return (
    <Box
      backgroundColor="backgroundContrast"
      borderRadius="md"
      padding={4}
      sx={{ position: 'relative' }}
    >
      <Box
        borderRadius="md"
        isInteractive
        onClick={handleClick}
        sx={{
          bottom: 0,
          left: 0,
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: 1,
        }}
      />
      <Stack direction="row" space={4} sx={{ alignItems: 'center' }}>
        <Stack space={2} sx={{ flexGrow: 1 }}>
          <Text variant="label">{song.name}</Text>
          <Text color="textSecondary" variant="helper">
            {updatedText}
          </Text>
        </Stack>
        <IconButton
          icon={<CloseIcon />}
          onClick={handleDeleteClick}
          sx={{
            alignItems: 'center',
            display: 'flex',
            position: 'relative',
            zIndex: 2,
          }}
        />
      </Stack>
    </Box>
  );
};
