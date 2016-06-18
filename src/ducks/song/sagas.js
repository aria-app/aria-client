import _ from 'lodash';
import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
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

export default function* saga() {
  yield [
    takeEvery(actionTypes.ADD_NEW_TRACK, addSequenceToNewTrack),
    takeEvery(actionTypes.DELETE_TRACK_BY_ID, deleteTrackById),
    takeEvery(actionTypes.ADD_SEQUENCE_TO_TRACK, addSequenceToTrack),
  ];
}
