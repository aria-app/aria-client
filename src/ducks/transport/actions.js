import _ from 'lodash';
import Tone from 'tone';
import playing from 'ducks/playing';
import sequencer from 'ducks/sequencer';
import song from 'ducks/song';
import * as actionTypes from './action-types';
import * as constants from './constants';
import * as selectors from './selectors';

export function createSequences() {
  return (dispatch, getState) => {
    const songSequences = song.selectors.getSequences(getState());
    const toneSequences = songSequences.map(s => new Tone.Sequence((time, step) => {
      const getNotes = song.selectors.createGetNotesById(s.id);
      const allNotes = getNotes(getState());
      const notesAtStep = _(allNotes)
        .filter(note => _.first(note.points).x === step)
        .uniqBy(note => _.first(note.points).y)
        .value();

      notesAtStep.forEach((note) =>
        dispatch(playing.actions.playNoteAtStep(note, time))
      );

      dispatch(setPosition(step));
    }, _.range(sequencer.selectors.getMeasureCount(getState()) * 32), '32n').start());

    dispatch(setSequences(toneSequences));
  };
}

export function initialize() {
  return (dispatch) => {
    dispatch(createSequences());
    dispatch(setTransportBPM(constants.defaultBPM));
  };
}

export function pause() {
  return (dispatch) => {
    dispatch(setPlaybackState(constants.playbackStates.PAUSED));
    dispatch(playing.actions.releaseAll());
    Tone.Transport.pause();
  };
}

export function play() {
  return (dispatch) => {
    dispatch(setPlaybackState(constants.playbackStates.STARTED));
    Tone.Transport.start();
  };
}

export function setBPM(bpm) {
  return {
    type: actionTypes.SET_BPM,
    bpm,
  };
}

export function setPlaybackState(playbackState) {
  return {
    type: actionTypes.SET_PLAYBACK_STATE,
    playbackState,
  };
}

export function setPosition(position) {
  return {
    type: actionTypes.SET_POSITION,
    position,
  };
}

export function setSequences(sequences) {
  return {
    type: actionTypes.SET_SEQUENCES,
    sequences,
  };
}

export function setTransportBPM(bpm) {
  return (dispatch) => {
    Tone.Transport.bpm.value = bpm;
    dispatch(setBPM(bpm));
  };
}

export function stop() {
  return (dispatch, getState) => {
    const playbackState = selectors.getPlaybackState(getState());

    if (playbackState === constants.playbackStates.STOPPED) return;

    dispatch(setPlaybackState(constants.playbackStates.STOPPED));
    dispatch(setPosition(0));
    dispatch(playing.actions.releaseAll());
    Tone.Transport.stop();
  };
}

export function togglePlayPause() {
  return (dispatch, getState) => {
    const playbackState = selectors.getPlaybackState(getState());

    if (playbackState !== constants.playbackStates.STARTED) {
      dispatch(play());
    } else {
      dispatch(pause());
    }
  };
}

export function updateSequences() {
  return (dispatch, getState) => {
    const sequences = selectors.getSequences(getState());

    sequences.forEach(s => s.dispose());

    dispatch(createSequences());
  };
}
