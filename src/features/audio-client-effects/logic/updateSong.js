import { createLogic } from 'redux-logic';
import appData from '../../app-data';
import sequenceData from '../../sequence-data';
import song from '../../song';
import tracksData from '../../tracks-data';
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
  ],
  process({ getState }, dispatch, done) {
    const songState = song.selectors.getSong(getState());
    // console.log('update requested');
    dawww.updateSong(songState);

    done();
  },
});
