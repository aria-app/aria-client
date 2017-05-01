import { takeEvery } from 'redux-saga';
import { call, select } from 'redux-saga/effects';
import AudioServer from '../../../audio-server';
import song from '../../song';
import appData from '../../app-data';

export function* request() {
  const sequences = yield select(song.selectors.getSequences);

  for (let i = 0; i < sequences.length; i += 1) {
    const sequence = sequences[i];
    const notes = yield select(song.selectors.getNotesBySequenceId(sequence.id));
    yield call(AudioServer.postSequence, sequence, notes);
  }
}

export default function* () {
  yield [
    takeEvery([
      appData.actions.SONG_LOADED,
    ], request),
  ];
}
