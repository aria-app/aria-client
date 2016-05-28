import _ from 'lodash';
import * as actionTypes from './action-types';
import * as selectors from './selectors';

export function setActiveSequenceId(activeSequenceId) {
  return (dispatch, getState) => {
    const oldActiveSequenceId = selectors.getActiveSequenceId(getState());

    if (activeSequenceId === oldActiveSequenceId) return;

    dispatch({
      type: actionTypes.SET_ACTIVE_SEQUENCE_ID,
      activeSequenceId,
    });
  };
}

export function setId(id) {
  return {
    type: actionTypes.SET_ID,
    id,
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
  return {
    type: actionTypes.SET_SEQUENCES,
    sequences,
  };
}

export function setTracks(tracks) {
  return {
    type: actionTypes.SET_TRACKS,
    tracks,
  };
}

export function updateSequence(sequence) {
  return (dispatch, getState) => {
    const sequences = selectors.getSequences(getState());
    const updatedSequences = replaceItemsById(sequences, [sequence]);

    dispatch(setSequences(updatedSequences));
  };
}

function replaceItemsById(list, items) {
  return list.map(i => {
    const newItem = _.find(items, { id: i.id });
    return newItem || i;
  });
}
