import _ from 'lodash';
import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import shared from '../shared';
import * as actions from './actions';
import * as actionTypes from './action-types';
import * as helpers from './helpers';
import * as selectors from './selectors';

function* addSequenceToNewTrack(action) {
  yield put(actions.sequencesAdded([
    helpers.createSequence({
      measureCount: 1,
      position: 0,
      trackId: action.track.id,
    }),
  ]));
}

function* addSequenceToTrack({ position, id }) {
  yield put(actions.sequencesAdded([
    helpers.createSequence({
      measureCount: 1,
      trackId: id,
      position,
    }),
  ]));
}

function* deleteSequencesFromTracks({ ids }) {
  const sequences = yield select(selectors.getSequencesByTrackIds(ids));
  const sequenceIds = _.map(sequences, 'id');

  yield put(actions.sequencesDeleted(sequenceIds));
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
    takeEvery(actionTypes.SEQUENCE_ADDED_TO_TRACK, addSequenceToTrack),
    takeEvery(actionTypes.TRACK_CREATED_AND_ADDED, addSequenceToNewTrack),
    takeEvery(actionTypes.TRACKS_DELETED, deleteSequencesFromTracks),
    takeEvery([
      actionTypes.BPM_SET,
      actionTypes.ID_SET,
      actionTypes.MEASURE_COUNT_SET,
      actionTypes.NAME_SET,
      actionTypes.NOTES_ADDED,
      actionTypes.NOTES_DELETED,
      actionTypes.NOTES_DUPLICATED,
      actionTypes.NOTES_SET,
      actionTypes.NOTES_UPDATED,
      actionTypes.SEQUENCE_ADDED_TO_TRACK,
      actionTypes.SEQUENCE_CLOSED,
      actionTypes.SEQUENCE_EXTENDED,
      actionTypes.SEQUENCE_NUDGED_LEFT,
      actionTypes.SEQUENCE_NUDGED_RIGHT,
      actionTypes.SEQUENCE_OPENED,
      actionTypes.SEQUENCE_SHORTENED,
      actionTypes.SEQUENCES_ADDED,
      actionTypes.SEQUENCES_DELETED,
      actionTypes.SEQUENCES_SET,
      actionTypes.SEQUENCES_UPDATED,
      actionTypes.SONG_EXTENDED,
      actionTypes.SONG_SHORTENED,
      actionTypes.TRACK_CREATED_AND_ADDED,
      actionTypes.TRACK_IS_MUTED_TOGGLED,
      actionTypes.TRACK_IS_SOLOING_TOGGLED,
      actionTypes.TRACK_SYNTH_TYPE_SET,
      actionTypes.TRACKS_ADDED,
      actionTypes.TRACKS_DELETED,
      actionTypes.TRACKS_SET,
      actionTypes.TRACKS_UPDATED,
    ], saveToLocalStorage),
  ];
}
