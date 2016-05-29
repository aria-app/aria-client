import _ from 'lodash';
import notes from 'ducks/notes';
import playing from 'ducks/playing';
import shared from 'ducks/shared';
import transport from 'ducks/transport';
import * as actionTypes from './action-types';
import * as selectors from './selectors';

const throttledSave = _.throttle((song) => {
  localStorage.setItem('zenAppSong', JSON.stringify(song));
}, 2000);

export function loadSong() {
  return (dispatch) => {
    const previousSong = localStorage.getItem('zenAppSong');

    if (!previousSong) return;

    dispatch(setSong(JSON.parse(previousSong)));
    dispatch(transport.effects.updateSequences());
    dispatch(playing.effects.initialize());
  };
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
  };
}

export function setNotes(notes) {
  return (dispatch, getState) => {
    const activeSequence = selectors.getActiveSequence(getState());
    const updatedSequence = {
      ...activeSequence,
      notes,
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
