import { eventChannel } from 'redux-saga';
import { put, take } from 'redux-saga/effects';
import audioClientData from '../../audio-client-data';
import dawww from '../dawww';

export default function* () {
  const playbackStateChannel = playbackStateChannelFactory();

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const playbackState = yield take(playbackStateChannel);
    yield put(audioClientData.actions.playbackStateRequestSucceeded(playbackState));
  }
}

function playbackStateChannelFactory() {
  return eventChannel(emit => dawww.onStateChange(emit));
}
