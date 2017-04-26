import { throttle } from 'lodash/fp';
import { takeEvery } from 'redux-saga';
import { select } from 'redux-saga/effects';
import appData from '../../app-data';
import sequenceData from '../../sequence-data';
import shared from '../../shared';
import tracksData from '../../tracks-data';
import * as selectors from '../selectors';

const throttledSave = throttle(500)((song) => {
  localStorage.setItem(shared.constants.localStorageKey, JSON.stringify(song));
});

function* saveToLocalStorage() {
  const song = yield select(selectors.getSong);
  throttledSave(song);
}

export default function* saga() {
  yield [
    takeEvery(appData.actions.BPM_SET, saveToLocalStorage),
    takeEvery(sequenceData.actions.NOTE_DRAWN, saveToLocalStorage),
    takeEvery(sequenceData.actions.NOTE_ERASED, saveToLocalStorage),
    takeEvery(sequenceData.actions.NOTES_DRAGGED, saveToLocalStorage),
    takeEvery(sequenceData.actions.NOTES_DUPLICATED, saveToLocalStorage),
    takeEvery(sequenceData.actions.NOTES_MOVED_OCTAVE_DOWN, saveToLocalStorage),
    takeEvery(sequenceData.actions.NOTES_MOVED_OCTAVE_UP, saveToLocalStorage),
    takeEvery(sequenceData.actions.NOTES_RESIZED, saveToLocalStorage),
    takeEvery(sequenceData.actions.SEQUENCE_CLOSED, saveToLocalStorage),
    takeEvery(tracksData.actions.SEQUENCE_NUDGED_LEFT, saveToLocalStorage),
    takeEvery(tracksData.actions.SEQUENCE_NUDGED_RIGHT, saveToLocalStorage),
    takeEvery(tracksData.actions.SEQUENCE_OPENED, saveToLocalStorage),
    takeEvery(tracksData.actions.SONG_EXTENDED, saveToLocalStorage),
    takeEvery(tracksData.actions.SONG_SHORTENED, saveToLocalStorage),
    takeEvery(tracksData.actions.TRACK_ADDED, saveToLocalStorage),
    takeEvery(tracksData.actions.TRACK_IS_MUTED_TOGGLED, saveToLocalStorage),
    takeEvery(tracksData.actions.TRACK_IS_SOLOING_TOGGLED, saveToLocalStorage),
    takeEvery(tracksData.actions.TRACK_SYNTH_TYPE_SET, saveToLocalStorage),
  ];
}
