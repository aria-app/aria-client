import { takeEvery } from 'redux-saga';
import { call } from 'redux-saga/effects';
import AudioServer from '../../../audio-server';
import tracksData from '../../tracks-data';

export function* requestDeleteFromSequenceChange({ sequence }) {
  yield call(AudioServer.sequences.delete, sequence);
}

export default function* () {
  yield [
    takeEvery([
      tracksData.actions.SEQUENCE_DELETED,
    ], requestDeleteFromSequenceChange),
  ];
}
