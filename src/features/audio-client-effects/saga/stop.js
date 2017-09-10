import { call } from 'redux-saga/effects';
import dawww from '../dawww';

export default function* () {
  yield call(dawww.stop);
}
