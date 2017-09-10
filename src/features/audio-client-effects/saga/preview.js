import getOr from 'lodash/fp/getOr';
import { call } from 'redux-saga/effects';
import dawww from '../dawww';

export default function* (action) {
  const pitch = getOr(-1, 'payload.pitch', action);
  const trackId = getOr('', 'payload.trackId', action);

  yield call(
    dawww.preview,
    trackId,
    pitch,
  );
}
