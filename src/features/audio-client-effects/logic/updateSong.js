import { createLogic } from 'redux-logic';
import appData from '../../app-data';
import sequenceData from '../../sequence-data';
import shared from '../../shared';
import song from '../../song';
import dawww from '../dawww';

export const updateSong = createLogic({
  type: [
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
    shared.actions.SEQUENCE_ADDED,
    shared.actions.SEQUENCE_DELETED,
    shared.actions.SEQUENCE_EXTENDED,
    shared.actions.SEQUENCE_NUDGED_LEFT,
    shared.actions.SEQUENCE_NUDGED_RIGHT,
    shared.actions.SEQUENCE_OPENED,
    shared.actions.SEQUENCE_SHORTENED,
    shared.actions.SONG_EXTENDED,
    shared.actions.SONG_SHORTENED,
    shared.actions.TRACK_ADDED,
    shared.actions.TRACK_DELETED,
    shared.actions.TRACK_IS_MUTED_TOGGLED,
    shared.actions.TRACK_IS_SOLOING_TOGGLED,
    shared.actions.TRACK_VOICE_SET,
  ],
  process({ getState }, dispatch, done) {
    const songState = song.selectors.getSong(getState());
    // console.log('update requested');
    dawww.updateSong(songState);

    done();
  },
});
