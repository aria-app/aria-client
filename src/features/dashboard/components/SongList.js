import PropTypes from 'prop-types';
import React from 'react';

import shared from '../../shared';
import SongListItem from './SongListItem';

const { Stack } = shared.components;

SongList.propTypes = {
  onDelete: PropTypes.func,
  onOpen: PropTypes.func,
  songs: PropTypes.arrayOf(PropTypes.object),
};

function SongList(props) {
  const { onDelete, onOpen, songs = [] } = props;

  return (
    <Stack animate space={4}>
      {songs.map((song) => (
        <SongListItem
          key={song.id}
          onClick={onOpen}
          onDelete={onDelete}
          song={song}
        />
      ))}
    </Stack>
  );
}

export default React.memo(SongList);
