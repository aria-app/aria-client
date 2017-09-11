import { eventChannel } from 'redux-saga';
import { put, take } from 'redux-saga/effects';
import audioClientData from '../../audio-client-data';
import dawww from '../dawww';

export default function* () {
  const positionChannel = positionChannelFactory();

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const position = yield take(positionChannel);
    yield put(audioClientData.actions.positionRequestSucceeded(position));
  }
}

function positionChannelFactory() {
  return eventChannel(emit => dawww.onPositionChange(emit));
}
