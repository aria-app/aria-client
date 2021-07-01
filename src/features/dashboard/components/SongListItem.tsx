import CloseIcon from '@material-ui/icons/Close';
import { Box, Stack, Text } from 'aria-ui';
import formatDistance from 'date-fns/formatDistance';
import parseISO from 'date-fns/parseISO';
import { memo, useCallback, useMemo } from 'react';

import { Song } from '../../../types';

export interface SongListItemProps {
  onDelete: (song: Song) => void;
  onOpen: (song: Song) => void;
  song: Song;
}

function SongListItem(props: SongListItemProps) {
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
      isInteractive
      onClick={handleClick}
      padding={4}
    >
      <Stack direction="row" space={4} sx={{ alignItems: 'center' }}>
        <Stack space={2} sx={{ flexGrow: 1 }}>
          <Text variant="label">{song.name}</Text>
          <Text color="textSecondary" variant="helper">
            {updatedText}
          </Text>
        </Stack>
        <Box
          onClick={handleDeleteClick}
          sx={{
            alignItems: 'center',
            display: 'flex',
            height: 32,
            width: 32,
          }}
        >
          <CloseIcon sx={{ color: 'text.secondary' }} />
        </Box>
      </Stack>
    </Box>
  );
}

export default memo(SongListItem);
