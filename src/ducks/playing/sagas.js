import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import song from 'ducks/song';
import transport from 'ducks/transport';
import * as actions from './actions';
import * as helpers from './helpers';
import * as effects from './effects';

function* updateTrack(action) {
  yield put(effects.updateTrack({
    id: action.track.id,
    activeSynths: [],
    previewSynth: helpers.createSynth(action.track.synthType),
    synths: helpers.createSynths(action.track.synthType),
  }));
}

function* addNewTrack(action) {
  yield put(actions.addTrack({
    id: action.track.id,
    activeSynths: [],
    previewSynth: helpers.createSynth(action.track.synthType),
    synths: helpers.createSynths(action.track.synthType),
  }));
  yield put(transport.effects.updateSequences());
}

export default function* saga() {
  yield [
    takeEvery(song.actionTypes.ADD_NEW_TRACK, addNewTrack),
    takeEvery(song.actionTypes.UPDATE_TRACK, updateTrack),
  ];
}
