import { Stack } from 'aria-ui';
import { FC, memo } from 'react';

import { SongListSong } from '../../../types';
import { SongListItem } from './SongListItem';

export interface SongListProps {
  onDelete: (song: SongListSong) => void;
  onOpen: (song: SongListSong) => void;
  songs: SongListSong[];
}

export const SongList: FC<SongListProps> = memo((props) => {
  const { onDelete, onOpen, songs = [] } = props;

  return (
    <Stack space={4}>
      {songs.map((song) => (
        <SongListItem
          key={song.id}
          onDelete={onDelete}
          onOpen={onOpen}
          song={song}
        />
      ))}
    </Stack>
  );
});
