import { map, throttle } from 'lodash/fp';
import { takeEvery } from 'redux-saga';
import { put, select } from 'redux-saga/effects';
import shared from '../shared';
import * as actions from './actions';
import * as helpers from './helpers';
import * as selectors from './selectors';
import sampleSong from './sample-song';

function* createAndAddTrack() {
  const track = helpers.createTrack();
  yield put(actions.tracksAdded([track]));
  yield put(actions.sequencesAdded([
    helpers.createSequence({
      measureCount: 1,
      position: 0,
      trackId: track.id,
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
  const sequenceIds = map('id')(sequences);

  yield put(actions.sequencesDeleted(sequenceIds));
}

function* initialize() {
  const localStorageSong = localStorage.getItem(
    shared.constants.localStorageKey,
  );

  const initialSong = localStorageSong
    ? JSON.parse(localStorageSong)
    : sampleSong;

  yield put(actions.songLoaded(initialSong));
}

const throttledSave = throttle(500)((song) => {
  localStorage.setItem(shared.constants.localStorageKey, JSON.stringify(song));
});

function* saveToLocalStorage() {
  const song = yield select(selectors.getSong);
  throttledSave(song);
}

export default function* saga() {
  yield [
    takeEvery(actions.SEQUENCE_ADDED_TO_TRACK, addSequenceToTrack),
    takeEvery(actions.TRACK_CREATED_AND_ADDED, createAndAddTrack),
    takeEvery(actions.TRACKS_DELETED, deleteSequencesFromTracks),
    takeEvery([
      actions.BPM_SET,
      actions.ID_SET,
      actions.MEASURE_COUNT_SET,
      actions.NAME_SET,
      actions.NOTES_ADDED,
      actions.NOTES_DELETED,
      actions.NOTES_DUPLICATED,
      actions.NOTES_SET,
      actions.NOTES_UPDATED,
      actions.SEQUENCE_ADDED_TO_TRACK,
      actions.SEQUENCE_CLOSED,
      actions.SEQUENCE_EXTENDED,
      actions.SEQUENCE_NUDGED_LEFT,
      actions.SEQUENCE_NUDGED_RIGHT,
      actions.SEQUENCE_OPENED,
      actions.SEQUENCE_SHORTENED,
      actions.SEQUENCES_ADDED,
      actions.SEQUENCES_DELETED,
      actions.SEQUENCES_SET,
      actions.SEQUENCES_UPDATED,
      actions.SONG_EXTENDED,
      actions.SONG_SHORTENED,
      actions.TRACK_CREATED_AND_ADDED,
      actions.TRACK_IS_MUTED_TOGGLED,
      actions.TRACK_IS_SOLOING_TOGGLED,
      actions.TRACK_SYNTH_TYPE_SET,
      actions.TRACKS_ADDED,
      actions.TRACKS_DELETED,
      actions.TRACKS_SET,
      actions.TRACKS_UPDATED,
    ], saveToLocalStorage),
    takeEvery(shared.actions.INITIALIZED, initialize),
  ];
}
