import { call } from 'redux-saga/effects';
import AudioServer from '../../../audio-server';

export function* requestPlaybackStop() {
  yield call(AudioServer.playback.stop);
}
