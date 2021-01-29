import React from 'react';

import SongContext from '../contexts/SongContext';
import * as helpers from '../helpers';

export default function SongProvider(props) {
  const [song, setSong] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const fetchSongById = React.useCallback((songId) => {
    (async () => {
      setLoading(true);

      const fetchedSong = await helpers.fetchSongById(songId);

      setSong(fetchedSong);
      setLoading(false);
    })();
  }, []);

  return (
    <SongContext.Provider
      value={{
        fetchSongById,
        loading,
        song,
      }}
      {...props}
    />
  );
}
