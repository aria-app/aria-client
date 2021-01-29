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

  const createTrack = React.useCallback(() => {
    const track = audioManager.helpers.createTrack();
    const sequence = audioManager.helpers.createSequence(track.id);

    setSong({
      ...song,
      sequences: {
        ...song.sequences,
        [sequence.id]: sequence,
      },
      tracks: {
        ...song.tracks,
        [track.id]: track,
      },
    });
  }, [audioManager, setSong, song]);

  const deleteSequence = React.useCallback(
    (sequence) => {
      setSong({
        ...song,
        sequences: omit(sequence.id, song.sequences),
      });
    },
    [setSong, song],
  );

  const deleteTrack = React.useCallback(
    (track) => {
      setSong({
        ...song,
        sequences: setAtIds(
          Object.values(song.sequences).filter(
            (sequence) => sequence.trackId !== track.id,
          ),
          {},
        ),
        tracks: omit(track.id, song.tracks),
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

  const updateMeasureCount = React.useCallback(
    (measureCount) => {
      setSong({
        ...song,
        measureCount,
      });
    },
    [setSong, song],
  );

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

  const updateTrack = React.useCallback(
    (track) => {
      setSong({
        ...song,
        tracks: {
          ...song.tracks,
          [track.id]: track,
        },
      });
    },
    [setSong, song],
  );

  return (
    <SongContext.Provider
      value={{
        createSequence,
        createTrack,
        deleteSequence,
        deleteTrack,
        duplicateSequence,
        getSong,
        loading,
        song,
        updateMeasureCount,
        updateSequence,
        updateTrack,
      }}
      {...props}
    />
  );
}
