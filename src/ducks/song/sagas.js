import _ from 'lodash';
import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import shared from 'ducks/shared';
import * as actions from './actions';
import * as actionTypes from './action-types';
import * as helpers from './helpers';
import * as selectors from './selectors';

function* addSequenceToNewTrack(action) {
  yield put(actions.sequenceAdded(helpers.createSequence({
    measureCount: 1,
    position: 0,
    trackId: action.track.id,
  })));
}

function* addSequenceToTrack({ position, track }) {
  yield put(actions.sequenceAdded(helpers.createSequence({
    measureCount: 1,
    trackId: track.id,
    position,
  })));
}

function* deleteTrackById({ id }) {
  const sequences = yield select(selectors.getSequencesByTrackId(id));
  const notes = yield select(selectors.getNotesBySequenceIds(_.map(sequences, 'id')));
  yield put(actions.sequencesDeleted(sequences));
  yield put(actions.notesDeleted(notes));
}

const throttledSave = _.throttle((song) => {
  localStorage.setItem(shared.constants.localStorageKey, JSON.stringify(song));
}, 500);

function* saveToLocalStorage() {
  const song = yield select(selectors.getSong);
  throttledSave(song);
}

export default function* saga() {
  yield [
    takeEvery(actionTypes.NEW_TRACK_ADDED, addSequenceToNewTrack),
    takeEvery(actionTypes.TRACK_DELETED_BY_ID, deleteTrackById),
    takeEvery(actionTypes.SEQUENCE_ADDED_TO_TRACK, addSequenceToTrack),
    takeEvery([
      actionTypes.BPM_SET,
      actionTypes.ID_SET,
      actionTypes.MEASURE_COUNT_SET,
      actionTypes.NAME_SET,
      actionTypes.NEW_TRACK_ADDED,
      actionTypes.NOTE_ADDED,
      actionTypes.NOTES_ADDED,
      actionTypes.NOTES_DELETED,
      actionTypes.NOTES_DUPLICATED,
      actionTypes.NOTES_SET,
      actionTypes.NOTES_UPDATED,
      actionTypes.SEQUENCE_ADDED,
      actionTypes.SEQUENCE_ADDED_TO_TRACK,
      actionTypes.SEQUENCE_DELETED,
      actionTypes.SEQUENCE_EXTENDED,
      actionTypes.SEQUENCE_NUDGED_LEFT,
      actionTypes.SEQUENCE_NUDGED_RIGHT,
      actionTypes.SEQUENCE_SHORTENED,
      actionTypes.SEQUENCES_ADDED,
      actionTypes.SEQUENCES_DELETED,
      actionTypes.SEQUENCES_SET,
      actionTypes.SEQUENCES_UPDATED,
      actionTypes.SONG_EXTENDED,
      actionTypes.SONG_SET,
      actionTypes.SONG_SHORTENED,
      actionTypes.TRACKS_ADDED,
      actionTypes.TRACK_DELETED_BY_ID,
      actionTypes.TRACK_IS_MUTED_TOGGLED,
      actionTypes.TRACK_IS_SOLOING_TOGGLED,
      actionTypes.TRACK_SYNTH_TYPE_SET,
      actionTypes.TRACK_UPDATED,
      actionTypes.TRACKS_DELETED,
      actionTypes.TRACKS_SET,
      actionTypes.TRACKS_UPDATED,
    ], saveToLocalStorage),
  ];
}
