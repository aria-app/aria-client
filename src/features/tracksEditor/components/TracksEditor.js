import find from 'lodash/fp/find';
import isEmpty from 'lodash/fp/isEmpty';
import isNil from 'lodash/fp/isNil';
import PropTypes from 'prop-types';
import React from 'react';
import { GlobalHotKeys } from 'react-hotkeys';

import audio from '../../audio';
import shared from '../../shared';
import songFeature from '../../song';
import TrackEditingModal from './TrackEditingModal';
import TrackList from './TrackList';
import TracksEditorToolbar from './TracksEditorToolbar';

const { useAudioManager, usePlaybackState, usePosition } = audio.hooks;
const { useSong } = songFeature.hooks;
const { Box, LoadingIndicator, Timeline } = shared.components;

TracksEditor.propTypes = {
  navigate: PropTypes.func,
};

function TracksEditor(props) {
  const { navigate } = props;
  const audioManager = useAudioManager();
  const playbackState = usePlaybackState();
  const position = usePosition();
  const {
    createSequence,
    createTrack,
    deleteSequence,
    deleteTrack,
    duplicateSequence,
    error,
    loading,
    song,
    updateMeasureCount,
    updateSequence,
    updateTrack,
  } = useSong();
  const [selectedSequenceId, setSelectedSequenceId] = React.useState('');
  const [selectedTrackId, setSelectedTrackId] = React.useState('');

  const tracks = React.useMemo(() => {
    if (!song) {
      return [];
    }

    return Object.values(song.tracks).map((track) => ({
      ...track,
      sequences: Object.values(song.sequences)
        .filter((sequence) => sequence.trackId === track.id)
        .map((sequence) => ({
          ...sequence,
          notes: Object.values(song.notes).filter(
            (note) => note.sequenceId === sequence.id,
          ),
        })),
    }));
  }, [song]);

  const sequences = React.useMemo(() => {
    if (!song) {
      return [];
    }

    return Object.values(song.sequences).map((sequence) => ({
      ...sequence,
      notes: Object.values(song.notes).filter(
        (note) => note.sequenceId === sequence.id,
      ),
    }));
  }, [song]);

  const selectedSequence = React.useMemo(
    () => find((s) => s.id === selectedSequenceId, sequences),
    [selectedSequenceId, sequences],
  );

  const selectedTrack = React.useMemo(
    () => find((t) => t.id === selectedTrackId, tracks),
    [selectedTrackId, tracks],
  );

  const handleSequenceDelete = React.useCallback(
    (e) => {
      e.preventDefault();

      if (isNil(selectedSequence)) return;

      deleteSequence(selectedSequence);
    },
    [deleteSequence, selectedSequence],
  );

  const handleSequenceDuplicate = React.useCallback(
    (e) => {
      e.preventDefault();

      if (isEmpty(selectedSequence)) return;

      const duplicatedSequence = duplicateSequence(selectedSequence);

      setSelectedSequenceId(duplicatedSequence.id);
    },
    [duplicateSequence, selectedSequence],
  );

  const handleSequenceOpen = React.useCallback(
    (sequence) => {
      navigate(`sequence/${sequence.id}`);
    },
    [navigate],
  );

  const handleTrackDeselect = React.useCallback(() => {
    setSelectedTrackId('');
  }, []);

  const handleTrackDelete = React.useCallback(
    (track) => {
      handleTrackDeselect();

      deleteTrack(track);
    },
    [deleteTrack, handleTrackDeselect],
  );

  const handleTrackListPositionSet = React.useCallback(
    (position) => {
      audioManager.setPosition(position);
    },
    [audioManager],
  );

  const handleTrackListSequenceDeselect = React.useCallback(() => {
    setSelectedSequenceId('');
  }, []);

  const handleTrackListSequenceSelect = React.useCallback((sequence) => {
    setSelectedSequenceId(sequence.id);
  }, []);

  const handleTrackListTrackAdd = React.useCallback(() => {
    createTrack();
  }, [createTrack]);

  const handleTrackSelect = React.useCallback((track) => {
    setSelectedTrackId(track.id);
  }, []);

  React.useEffect(() => {
    if (!song || true) return;

    audioManager.updateSong(song);
  }, [audioManager, song]);

  return (
    <Box
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <GlobalHotKeys
        allowChanges={true}
        handlers={{
          DELETE: handleSequenceDelete,
          DUPLICATE: handleSequenceDuplicate,
        }}
        keyMap={{
          DELETE: ['backspace', 'del'],
          DUPLICATE: ['ctrl+shift+d', 'meta+shift+d'],
        }}
      />
      {loading && <LoadingIndicator>LOADING SONG...</LoadingIndicator>}
      {!loading && error && <div>Failed to load song</div>}
      {!loading && !error && (
        <>
          <TrackList
            isLoading={loading}
            onPositionSet={handleTrackListPositionSet}
            onSequenceAdd={createSequence}
            onSequenceDeselect={handleTrackListSequenceDeselect}
            onSequenceEdit={updateSequence}
            onSequenceOpen={handleSequenceOpen}
            onSequenceSelect={handleTrackListSequenceSelect}
            onSongMeasureCountChange={updateMeasureCount}
            onTrackAdd={handleTrackListTrackAdd}
            onTrackStage={handleTrackSelect}
            selectedSequence={selectedSequence}
            songMeasureCount={song && song.measureCount}
            tracks={tracks}
          />
          <TracksEditorToolbar
            onSequenceDelete={handleSequenceDelete}
            onSequenceDuplicate={handleSequenceDuplicate}
            onSequenceOpen={handleSequenceOpen}
            selectedSequence={selectedSequence}
          />
        </>
      )}
      <Timeline
        isVisible={
          playbackState !== audioManager.constants.PLAYBACK_STATES.STOPPED
        }
        offset={position * 2 + 16}
      />
      {!loading && (
        <TrackEditingModal
          onDelete={handleTrackDelete}
          onDismiss={handleTrackDeselect}
          onTrackChange={updateTrack}
          track={selectedTrack}
        />
      )}
    </Box>
  );
}

export default React.memo(TracksEditor);
