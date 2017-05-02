import { call } from 'redux-saga/effects';
import { getNoteName } from '../helpers';
import AudioServer from '../../../audio-server';

export function* requestKeyPreview({ y }) {
  yield call(
    AudioServer.playback.previewNote,
    getNoteName(y),
    '16n',
  );
}
