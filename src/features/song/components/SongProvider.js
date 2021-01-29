import React from 'react';

import SongContext from '../contexts/SongContext';
import * as helpers from '../helpers';

export default function SongProvider(props) {
  const [song, setSong] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const deepSong = React.useMemo(() => {
    if (!song) return null;

    return {
      bpm: song.bpm,
      id: song.id,
      measureCount: song.measureCount,
      name: song.name,
      tracks: Object.values(song.tracks).map((track) => ({
        ...track,
        sequences: Object.values(song.sequences)
          .filter((sequence) => sequence.trackId === track.id)
          .map((sequence) => ({
            ...sequence,
            notes: Object.values(song.notes).filter(
              (note) => note.sequenceId === sequence.id,
            ),
          })),
      })),
      userId: song.userId,
    };
  }, [song]);

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
        deepSong,
        fetchSongById,
        loading,
        song,
      }}
      {...props}
    />
  );
}
