import { takeEvery } from 'redux-saga';
import { call, select } from 'redux-saga/effects';
import appData from '../../app-data';
import sequenceData from '../../sequence-data';
import tracksData from '../../tracks-data';
import song from '../../song';
import dawww from '../dawww';

export function* load(action) {
  yield call(dawww.updateSong, action.song);
}

export function* update() {
  console.log('update requested');
  const songState = yield select(song.selectors.getSong);
  yield call(dawww.updateSong, songState);
}

export default function* () {
  yield [
    takeEvery(appData.actions.SONG_LOADED, load),
    takeEvery([
      appData.actions.BPM_SET,
      sequenceData.actions.NOTE_DRAWN,
      sequenceData.actions.NOTE_ERASED,
      sequenceData.actions.NOTES_DELETED,
      sequenceData.actions.NOTES_DRAGGED,
      sequenceData.actions.NOTES_DUPLICATED,
      sequenceData.actions.NOTES_MOVED_OCTAVE_DOWN,
      sequenceData.actions.NOTES_MOVED_OCTAVE_UP,
      sequenceData.actions.NOTES_NUDGED,
      sequenceData.actions.NOTES_RESIZED,
      tracksData.actions.SEQUENCE_ADDED,
      tracksData.actions.SEQUENCE_DELETED,
      tracksData.actions.SEQUENCE_EXTENDED,
      tracksData.actions.SEQUENCE_NUDGED_LEFT,
      tracksData.actions.SEQUENCE_NUDGED_RIGHT,
      tracksData.actions.SEQUENCE_OPENED,
      tracksData.actions.SEQUENCE_SHORTENED,
      tracksData.actions.SONG_EXTENDED,
      tracksData.actions.SONG_SHORTENED,
      tracksData.actions.TRACK_ADDED,
      tracksData.actions.TRACK_DELETED,
      tracksData.actions.TRACK_IS_MUTED_TOGGLED,
      tracksData.actions.TRACK_IS_SOLOING_TOGGLED,
      tracksData.actions.TRACK_VOICE_SET,
    ], update),
  ];
}
