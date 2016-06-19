import _ from 'lodash';
import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import shared from 'ducks/shared';
import * as actions from './actions';
import * as actionTypes from './action-types';
import * as helpers from './helpers';
import * as selectors from './selectors';

function* addSequenceToNewTrack(action) {
  yield put(actions.addSequence(helpers.createSequence({
    measureCount: 1,
    position: 0,
    trackId: action.track.id,
  })));
}

function* addSequenceToTrack({ position, track }) {
  yield put(actions.addSequence(helpers.createSequence({
    measureCount: 1,
    trackId: track.id,
    position,
  })));
}

function* deleteTrackById() {
  const sequences = yield select(selectors.getSequencesByTrackId);
  const notes = yield select(selectors.getNotesBySequenceIds(_.map(sequences, 'id')));
  yield put(actions.deleteSequences(sequences));
  yield put(actions.deleteNotes(notes));
}

const throttledSave = _.throttle((song) => {
  localStorage.setItem(shared.constants.localStorageKey, JSON.stringify(song));
}, 500);

function* saveToLocalStorage() {
  const song = yield select(selectors.getSong);
  throttledSave(song);
}

export default function* saga() {
  yield [
    takeEvery(actionTypes.ADD_NEW_TRACK, addSequenceToNewTrack),
    takeEvery(actionTypes.DELETE_TRACK_BY_ID, deleteTrackById),
    takeEvery(actionTypes.ADD_SEQUENCE_TO_TRACK, addSequenceToTrack),
    takeEvery([
      actionTypes.ADD_NEW_TRACK,
      actionTypes.ADD_NOTE,
      actionTypes.ADD_NOTES,
      actionTypes.ADD_SEQUENCE,
      actionTypes.ADD_SEQUENCE_TO_TRACK,
      actionTypes.ADD_SEQUENCES,
      actionTypes.ADD_TRACKS,
      actionTypes.DELETE_NOTES,
      actionTypes.DELETE_SEQUENCE,
      actionTypes.DELETE_SEQUENCES,
      actionTypes.DELETE_TRACK_BY_ID,
      actionTypes.DELETE_TRACKS,
      actionTypes.DUPLICATE_NOTES,
      actionTypes.EXTEND_SEQUENCE,
      actionTypes.EXTEND_SONG,
      actionTypes.MOVE_SEQUENCE_LEFT,
      actionTypes.MOVE_SEQUENCE_RIGHT,
      actionTypes.SET_BPM,
      actionTypes.SET_ID,
      actionTypes.SET_MEASURE_COUNT,
      actionTypes.SET_NAME,
      actionTypes.SET_NOTES,
      actionTypes.SET_SEQUENCES,
      actionTypes.SET_SONG,
      actionTypes.SET_TRACKS,
      actionTypes.SHORTEN_SEQUENCE,
      actionTypes.SHORTEN_SONG,
      actionTypes.TOGGLE_TRACK_IS_MUTED,
      actionTypes.TOGGLE_TRACK_IS_SOLOING,
      actionTypes.UPDATE_NOTES,
      actionTypes.UPDATE_SEQUENCES,
      actionTypes.UPDATE_TRACK,
      actionTypes.UPDATE_TRACKS,
    ], saveToLocalStorage),
  ];
}
