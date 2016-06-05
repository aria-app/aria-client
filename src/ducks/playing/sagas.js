import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import playing from 'ducks/playing';
import song from 'ducks/song';
import * as helpers from './helpers';

function* updateTrack(action) {
  yield put(playing.effects.updateTrack({
    id: action.track.id,
    activeSynths: [],
    previewSynth: helpers.createSynth(action.track.synthType),
    synths: helpers.createSynths(action.track.synthType),
  }));
}

export default function* saga() {
  yield [
    takeEvery(song.actionTypes.UPDATE_TRACK, updateTrack),
  ];
}
