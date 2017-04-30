import { takeEvery } from 'redux-saga';
import { call, select } from 'redux-saga/effects';
import AudioServer from '../../../audio-server';
import song from '../../song';
import tracksData from '../../audio-client-data';

export function* request({ sequence }) {
  const notes = yield select(song.selectors.getNotesBySequenceId(sequence.id));
  const serverSequence = yield call(AudioServer.postSequence, sequence, notes);

  console.log('Server Sequence', serverSequence);
}

export default function* () {
  yield [
    takeEvery([
      tracksData.actions.SEQUENCE_ADDED,
      tracksData.actions.TRACK_ADDED,
    ], request),
  ];
}

// All actions
//     sequenceData.actions.NOTE_DRAWN,
//     sequenceData.actions.NOTE_ERASED,
//     sequenceData.actions.NOTE_SELECTED,
//     sequenceData.actions.NOTES_ALL_DESELECTED,
//     sequenceData.actions.NOTES_ALL_SELECTED,
//     sequenceData.actions.NOTES_DRAGGED,
//     sequenceData.actions.NOTES_DUPLICATED,
//     sequenceData.actions.NOTES_MOVED_OCTAVE_DOWN,
//     sequenceData.actions.NOTES_MOVED_OCTAVE_UP,
//     sequenceData.actions.NOTES_NUDGED,
//     sequenceData.actions.NOTES_RESIZED,
//     sequenceData.actions.NOTES_SELECTED_IN_AREA,
//     sequenceData.actions.NOTES_DELETED,
//     tracksData.actions.SEQUENCE_NUDGED_LEFT,
//     tracksData.actions.SEQUENCE_NUDGED_RIGHT,
//     tracksData.actions.SEQUENCE_ADDED,
//     tracksData.actions.SEQUENCE_DELETED,
//     tracksData.actions.SEQUENCE_DESELECTED,
//     tracksData.actions.SEQUENCE_EXTENDED,
//     tracksData.actions.SEQUENCE_OPENED,
//     tracksData.actions.SEQUENCE_SELECTED,
//     tracksData.actions.SEQUENCE_SHORTENED,
//     tracksData.actions.SONG_EXTENDED,
//     tracksData.actions.SONG_SHORTENED,
//     tracksData.actions.TRACK_ADDED,
//     tracksData.actions.TRACK_DELETED,
//     tracksData.actions.TRACK_EDITING_FINISHED,
//     tracksData.actions.TRACK_EDITING_STARTED,
//     tracksData.actions.TRACK_IS_MUTED_TOGGLED,
//     tracksData.actions.TRACK_IS_SOLOING_TOGGLED,
//     tracksData.actions.TRACK_SYNTH_TYPE_SET,
