import getOr from 'lodash/fp/getOr';
import { takeEvery } from 'redux-saga';
import { call } from 'redux-saga/effects';
import sequenceData from '../../sequence-data';
import dawww from '../dawww';

function* preview(action) {
  const pitch = getOr(-1, 'payload.pitch', action);
  const trackId = getOr('', 'payload.trackId', action);

  yield call(
    dawww.preview,
    trackId,
    pitch,
  );
}

export default function* () {
  yield [
    takeEvery(sequenceData.actions.KEY_PRESSED, preview),
  ];
}
