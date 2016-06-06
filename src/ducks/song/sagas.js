import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import * as actions from './actions';
import * as actionTypes from './action-types';
import * as helpers from './helpers';

function* addSequenceToNewTrack(action) {
  yield put(actions.addSequence(helpers.createSequence({
    measureCount: 1,
    position: 0,
    trackId: action.track.id,
  })));
}

export default function* saga() {
  yield [
    takeEvery(actionTypes.ADD_NEW_TRACK, addSequenceToNewTrack),
  ];
}
