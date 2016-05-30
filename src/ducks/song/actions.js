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

export function addTrack(options) {
  return (dispatch, getState) => {
    const tracks = selectors.getTracks(getState());
    const newTrack = {
      id: shared.helpers.getId(tracks),
      synthType: options.synthType,
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

const throttledSave = _.throttle((song) => {
  localStorage.setItem('zenAppSong', JSON.stringify(song));
}, 2000);

export function loadSong() {
  return (dispatch) => new Promise(resolve => {
    const previousSong = localStorage.getItem('zenAppSong');

    if (!previousSong) return resolve();

    dispatch(setSong(JSON.parse(previousSong)));

    return resolve();
  });
}

export function setActiveSequenceId(activeSequenceId) {
  return (dispatch, getState) => {
    const oldActiveSequenceId = selectors.getActiveSequenceId(getState());

    if (activeSequenceId === oldActiveSequenceId) return;

    dispatch(notes.actions.setSelectedNoteIds([]));
    dispatch({
      type: actionTypes.SET_ACTIVE_SEQUENCE_ID,
      activeSequenceId,
    });

    const playbackState = transport.selectors.getPlaybackState(getState());

    if (activeSequenceId !== undefined) {
      dispatch(transport.effects.loopActiveSequence());
    } else {
      dispatch(transport.effects.loopSong());
    }

    dispatch(transport.effects.stop());

    if (playbackState === transport.constants.playbackStates.STARTED) {
      setTimeout(() => dispatch(transport.effects.play()), 500);
    }
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
