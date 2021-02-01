import omit from 'lodash/fp/omit';
import React from 'react';

import audio from '../../audio';
import shared from '../../shared';
import SongContext from '../contexts/SongContext';
import * as helpers from '../helpers';

const { useAudioManager } = audio.hooks;
const { setAtIds } = shared.helpers;

export default function SongProvider(props) {
  const audioManager = useAudioManager();
  const [song, setSong] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const handleSongUpdate = React.useCallback(
    (updatedSong) => {
      (async () => {
        const previousSong = { ...song };

        try {
          setSong(updatedSong);

          // await helpers.updateSong(updatedSong);
        } catch (e) {
          console.error(e.message);

          setSong(previousSong);
        }
      })();
    },
    [setSong, song],
  );

  const createNote = React.useCallback(
    (note) => {
      handleSongUpdate({
        ...song,
        notes: {
          ...song.notes,
          [note.id]: note,
        },
      });
    },
    [handleSongUpdate, song],
  );

  const createSequence = React.useCallback(
    ({ position, track }) => {
      const sequence = audioManager.helpers.createSequence(track.id, position);

      handleSongUpdate({
        ...song,
        sequences: {
          ...song.sequences,
          [sequence.id]: sequence,
        },
      });
    },
    [audioManager, handleSongUpdate, song],
  );

  const createTrack = React.useCallback(() => {
    const track = audioManager.helpers.createTrack();
    const sequence = audioManager.helpers.createSequence(track.id);

    handleSongUpdate({
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
  }, [audioManager, handleSongUpdate, song]);

  const deleteNotes = React.useCallback(
    (notes) => {
      handleSongUpdate({
        ...song,
        notes: omit(
          notes.map((note) => note.id),
          song.notes,
        ),
      });
    },
    [handleSongUpdate, song],
  );

  const deleteSequence = React.useCallback(
    (sequence) => {
      handleSongUpdate({
        ...song,
        sequences: omit(sequence.id, song.sequences),
      });
    },
    [handleSongUpdate, song],
  );

  const deleteTrack = React.useCallback(
    (track) => {
      handleSongUpdate({
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
    [handleSongUpdate, song],
  );

  const duplicateNotes = React.useCallback(
    (notes) => {
      const duplicatedNotes = audioManager.helpers.duplicateNotes(notes);

      handleSongUpdate({
        ...song,
        notes: setAtIds(duplicatedNotes, song.notes),
      });

      return duplicatedNotes;
    },
    [audioManager, handleSongUpdate, song],
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

      handleSongUpdate({
        ...song,
        notes: setAtIds(notesWithNewSequenceId, song.notes),
        sequences: {
          ...song.sequences,
          [duplicatedSequence.id]: duplicatedSequence,
        },
      });

      return duplicatedSequence;
    },
    [audioManager, handleSongUpdate, song],
  );

  const getSong = React.useCallback(async (songId) => {
    try {
      setLoading(true);
      const fetchedSong = await helpers.fetchSongById(songId);

      setError(null);
      setSong(fetchedSong);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateBPM = React.useCallback(
    (bpm) => {
      handleSongUpdate({
        ...song,
        bpm,
      });
    },
    [handleSongUpdate, song],
  );

  const updateMeasureCount = React.useCallback(
    (measureCount) => {
      handleSongUpdate({
        ...song,
        measureCount,
      });
    },
    [handleSongUpdate, song],
  );

  const updateNotes = React.useCallback(
    (notes) => {
      handleSongUpdate({
        ...song,
        notes: setAtIds(notes, song.notes),
      });
    },
    [handleSongUpdate, song],
  );

  const updateSequence = React.useCallback(
    (sequence) => {
      handleSongUpdate({
        ...song,
        sequences: {
          ...song.sequences,
          [sequence.id]: sequence,
        },
      });
    },
    [handleSongUpdate, song],
  );

  const updateTrack = React.useCallback(
    (track) => {
      handleSongUpdate({
        ...song,
        tracks: {
          ...song.tracks,
          [track.id]: track,
        },
      });
    },
    [handleSongUpdate, song],
  );

  return (
    <SongContext.Provider
      value={{
        createNote,
        createSequence,
        createTrack,
        deleteNotes,
        deleteSequence,
        deleteTrack,
        duplicateNotes,
        duplicateSequence,
        error,
        getSong,
        loading,
        song,
        updateBPM,
        updateMeasureCount,
        updateNotes,
        updateSequence,
        updateTrack,
      }}
      {...props}
    />
  );
}
