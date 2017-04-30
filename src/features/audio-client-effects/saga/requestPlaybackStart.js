import { call } from 'redux-saga/effects';
import AudioServer from '../../../audio-server';

export function* requestPlaybackStart() {
  yield call(AudioServer.start);
}
