import { call } from 'redux-saga/effects';
import { getNoteName } from '../helpers';
import { playNote } from '../../../audio-server';

export function* requestKeyPreview({ payload }) {
  yield call(
    playNote,
    getNoteName(payload),
    '16n',
  );
  // const length = sizeToTime(last(note.points).x - first(note.points).x);
}
