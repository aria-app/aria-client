import _ from 'lodash';
import notes from 'ducks/notes';
import playing from 'ducks/playing';
import shared from 'ducks/shared';
import transport from 'ducks/transport';
import * as actionTypes from './action-types';
import * as selectors from './selectors';

export function addSequence(options) {
  return (dispatch, getState) => {
    const sequences = selectors.getSequences(getState());
    const newSequence = {
      id: shared.helpers.getId(sequences),
      notes: [],
      measureCount: options.measureCount,
      trackId: options.trackId,
    };
    const updatedSequences = [
      ...sequences,
      newSequence,
    ];

    dispatch(setSequences(updatedSequences));
  };
}

export function addTrack() {
  return (dispatch, getState) => {
    const tracks = selectors.getTracks(getState());
    const newTrack = {
      id: shared.helpers.getId(tracks),
      synthType: shared.constants.defaultSynthType,
    };
    const updatedTracks = [
      ...tracks,
      newTrack,
    ];

    dispatch(setTracks(updatedTracks));
    dispatch(addSequence({
      measureCount: 1,
      trackId: newTrack.id,
    }));
  };
}

export function deleteTrackById(trackId) {
  return (dispatch, getState) => {
    const tracks = selectors.getTracks(getState());
    const updatedTracks = _.reject(tracks, { id: trackId });

    dispatch(setTracks(updatedTracks));
  };
}

const throttledSave = _.throttle((song) => {
  // localStorage.setItem('zenAppSong', JSON.stringify(song));
}, 500);

export function loadSong() {
  return (dispatch) => new Promise(resolve => {
    const previousSong = localStorage.getItem('zenAppSong');

    if (!previousSong) return resolve();

    dispatch(setSong(JSON.parse(previousSong)));

    return resolve();
  });
}

export function setActiveSequenceId(activeSequenceId) {
  return (dispatch) => {
    dispatch(notes.actions.setSelectedNoteIds([]));
    dispatch({
      type: actionTypes.SET_ACTIVE_SEQUENCE_ID,
      activeSequenceId,
    });
    dispatch(transport.effects.updateLooping());
  };
}

export function setBPM(bpm) {
  return (dispatch, getState) => {
    const song = selectors.getSong(getState());
    const safeBpm = _.clamp(bpm, shared.constants.minBPM, shared.constants.maxBPM);
    const updatedSong = {
      ...song,
      bpm: safeBpm,
    };

    dispatch(setSongWithSave(updatedSong));
    dispatch(transport.effects.updateBPM());
  };
}

export function setNotes(newNotes) {
  return (dispatch, getState) => {
    const activeSequence = selectors.getActiveSequence(getState());
    const updatedSequence = {
      ...activeSequence,
      notes: newNotes,
    };

    dispatch(updateSequence(updatedSequence));
  };
}

export function setSequences(sequences) {
  return (dispatch, getState) => {
    const song = selectors.getSong(getState());
    const updatedSong = {
      ...song,
      sequences,
    };

    dispatch(setSongWithSave(updatedSong));
  };
}

export function setSong(song) {
  return {
    type: actionTypes.SET_SONG,
    song,
  };
}

export function setSongWithSave(song) {
  return (dispatch) => {
    throttledSave(song);
    dispatch(setSong(song));
  };
}

export function setTracks(tracks) {
  return (dispatch, getState) => {
    const song = selectors.getSong(getState());
    const updatedSong = {
      ...song,
      tracks,
    };

    dispatch(setSongWithSave(updatedSong));
    dispatch(playing.effects.updateTracks());
  };
}

export function updateSequence(sequence) {
  return (dispatch, getState) => {
    const sequences = selectors.getSequences(getState());
    const updatedSequences = shared.helpers.replaceItemsById(
      sequences,
      [sequence],
    );

    dispatch(setSequences(updatedSequences));
  };
}

export function updateTrack(track) {
  return (dispatch, getState) => {
    const tracks = selectors.getTracks(getState());
    const updatedTracks = shared.helpers.replaceItemsById(
      tracks,
      [track],
    );

    dispatch(setTracks(updatedTracks));
  };
}

export function decrementSequenceLength(id) {
  return (dispatch, getState) => {
    const sequence = selectors.getSequenceById(getState(), id);
    const newMeasureCount = sequence.measureCount - 1;

    if (newMeasureCount < 1) return;

    const updatedSequence = {
      ...sequence,
      measureCount: newMeasureCount,
    };

    dispatch(updateSequence(updatedSequence));
    dispatch(transport.effects.updateSequences());
  };
}

export function incrementSequenceLength(id) {
  return (dispatch, getState) => {
    const sequence = selectors.getSequenceById(getState(), id);
    const newMeasureCount = sequence.measureCount + 1;

    const updatedSequence = {
      ...sequence,
      measureCount: newMeasureCount,
    };

    dispatch(updateSequence(updatedSequence));
    dispatch(transport.effects.updateSequences());
  };
}

export function decrementSequencePosition(id) {
  return (dispatch, getState) => {
    const sequence = selectors.getSequenceById(getState(), id);
    const newPosition = sequence.position - 1;

    if (newPosition < 0) return;

    const updatedSequence = {
      ...sequence,
      position: newPosition,
    };

    dispatch(updateSequence(updatedSequence));
    dispatch(transport.effects.updateSequences());
  };
}

export function incrementSequencePosition(id) {
  return (dispatch, getState) => {
    const songMeasureCount = selectors.getMeasureCount(getState());
    const sequence = selectors.getSequenceById(getState(), id);
    const newPosition = sequence.position + 1;

    if (newPosition > songMeasureCount - 1) return;

    const updatedSequence = {
      ...sequence,
      position: newPosition,
    };

    dispatch(updateSequence(updatedSequence));
    dispatch(transport.effects.updateSequences());
  };
}

export function decrementSongLength() {
  return (dispatch, getState) => {
    const song = selectors.getSong(getState());
    const newMeasureCount = song.measureCount - 1;

    if (newMeasureCount < 1) return;

    const updatedSong = {
      ...song,
      measureCount: newMeasureCount,
    };

    dispatch(setSongWithSave(updatedSong));
    dispatch(transport.effects.updateLooping());
  };
}

export function incrementSongLength() {
  return (dispatch, getState) => {
    const song = selectors.getSong(getState());
    const newMeasureCount = song.measureCount + 1;

    const updatedSong = {
      ...song,
      measureCount: newMeasureCount,
    };

    dispatch(setSongWithSave(updatedSong));
    dispatch(transport.effects.updateLooping());
  };
}
