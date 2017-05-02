import { eventChannel } from 'redux-saga';
import { put, take } from 'redux-saga/effects';
import AudioServer from '../../../audio-server';
import audioClientData from '../../audio-client-data';

export function* subscribeToPlaybackState() {
  const playbackStateChannel = playbackStateChannelFactory();

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const playbackState = yield take(playbackStateChannel);
    yield put(audioClientData.actions.playbackStateRequestSucceeded(playbackState));
  }
}

function playbackStateChannelFactory() {
  return eventChannel(emit => AudioServer.playback.onStateChange(emit));
}
