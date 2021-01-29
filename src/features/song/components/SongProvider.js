import omit from 'lodash/fp/omit';
import React from 'react';

import audio from '../../audio';
import shared from '../../shared';
import SongContext from '../contexts/SongContext';
import { fetchSongById } from '../helpers';

const { useAudioManager } = audio.hooks;
const { setAtIds } = shared.helpers;

export default function SongProvider(props) {
  const audioManager = useAudioManager();
  const [song, setSong] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const createSequence = React.useCallback(
    ({ position, track }) => {
      const sequence = audioManager.helpers.createSequence(track.id, position);

      setSong({
        ...song,
        sequences: {
          ...song.sequences,
          [sequence.id]: sequence,
        },
      });
    },
    [audioManager, setSong, song],
  );

  const deleteSequence = React.useCallback(
    (sequence) => {
      setSong({
        ...song,
        sequences: omit(sequence.id, song.sequences),
      });
    },
    [setSong, song],
  );

  const duplicateSequence = React.useCallback(
    (sequence) => {
      const duplicatedSequence = audioManager.helpers.createSequence(
        sequence.trackId,
        sequence.position,
        sequence.measureCount,
      );

      const notesInSequence = Object.values(song.notes).filter(
        (note) => note.sequenceId === sequence.id,
      );
      const duplicatedNotes = audioManager.helpers.duplicateNotes(
        notesInSequence,
      );
      const notesWithNewSequenceId = duplicatedNotes.map((note) => ({
        ...note,
        sequenceId: duplicatedSequence.id,
      }));

      setSong({
        ...song,
        notes: setAtIds(notesWithNewSequenceId, song.notes),
        sequences: {
          ...song.sequences,
          [duplicatedSequence.id]: duplicatedSequence,
        },
      });

      return duplicatedSequence;
    },
    [audioManager, setSong, song],
  );

  const getSong = React.useCallback((songId) => {
    (async () => {
      setLoading(true);

      const fetchedSong = await fetchSongById(songId);

      setSong(fetchedSong);
      setLoading(false);
    })();
  }, []);

  const updateSequence = React.useCallback(
    (sequence) => {
      setSong({
        ...song,
        sequences: {
          ...song.sequences,
          [sequence.id]: sequence,
        },
      });
    },
    [setSong, song],
  );

  return (
    <SongContext.Provider
      value={{
        createSequence,
        deleteSequence,
        duplicateSequence,
        getSong,
        loading,
        song,
        updateSequence,
      }}
      {...props}
    />
  );
}
