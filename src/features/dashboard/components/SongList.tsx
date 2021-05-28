import { memo } from 'react';

import { Song } from '../../../types';
import shared from '../../shared';
import SongListItem from './SongListItem';

const { Stack } = shared.components;

export interface SongListProps {
  onDelete: (song: Song) => void;
  onOpen: (song: Song) => void;
  songs: Song[];
}

function SongList(props: SongListProps) {
  const { onDelete, onOpen, songs = [] } = props;

  return (
    <Stack animate space={4}>
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
}

export default memo(SongList);
