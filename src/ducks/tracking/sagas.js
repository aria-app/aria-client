import _ from 'lodash';
import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import song from 'ducks/song';
import * as actions from './actions';
import * as actionTypes from './action-types';
import * as selectors from './selectors';

function* applyStagedTrack() {
  const stagedTrack = yield select(selectors.getStagedTrack);
  const originalTrack = yield select(song.selectors.getTrackById(stagedTrack.id));
  if (!_.isEqual(stagedTrack, originalTrack)) {
    yield put(song.actions.updateTrack(stagedTrack));
  }
  yield put(actions.clearStagedTrack());
}

function* deleteStagedTrack() {
  const stagedTrack = yield select(selectors.getStagedTrack);
  yield put(song.actions.deleteTrackById(stagedTrack.id));
  yield put(actions.clearStagedTrack());
}

export default function* saga() {
  yield [
    takeEvery(actionTypes.APPLY_STAGED_TRACK, applyStagedTrack),
    takeEvery(actionTypes.DELETE_STAGED_TRACK, deleteStagedTrack),
  ];
}
