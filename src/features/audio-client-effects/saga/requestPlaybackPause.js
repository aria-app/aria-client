import { call } from 'redux-saga/effects';
import AudioServer from '../../../audio-server';

export function* requestPlaybackPause() {
  yield call(AudioServer.pause);
}
