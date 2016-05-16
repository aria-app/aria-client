import _ from 'lodash';
import Tone from 'tone';
import notes from 'modules/notes';
import sequence from 'modules/sequence';
import actionTypes from './action-types';
import * as constants from './constants';
import selectors from './selectors';

export function createSequence() {
  return (dispatch, getState) => {
    const toneSequence = new Tone.Sequence((time, step) => {
      const synth = selectors.getSynth(getState());
      const bpm = selectors.getBpm(getState());
      const allNotes = notes.selectors.getNotes(getState());
      const notesAtStep = _(allNotes)
        .filter(note => note.position.x === step)
        .uniqBy('name')
        .value();

      notesAtStep.forEach((note, index) => {
        const length = notes.helpers.sizeToSeconds(note.endPosition.x - note.position.x, bpm);
        synth.voices[index].triggerAttack(note.name, time);
        if (note.endPosition.y !== note.position.y) {
          // synth.voices[index].frequency.setValueAtTime(note.name, time);
          synth.voices[index].frequency.linearRampToValueAtTime(note.endName, time + length);
          synth.voices[index].frequency.setValueAtTime(note.endName, time + length);
        }
        synth.voices[index].triggerRelease(time + length);
      });

      dispatch(setPosition(step));
    }, _.range(sequence.selectors.getMeasureCount(getState()) * 32), '32n');

    toneSequence.start();
  };
}

export function initialize() {
  return (dispatch) => {
    dispatch(createSequence());
    dispatch(setTransportBPM(constants.defaultBPM));
  };
}

export function playNote(name, size = 1, time) {
  return (dispatch, getState) => {
    const synth = selectors.getSynth(getState());
    const bpm = selectors.getBpm(getState());

    synth.triggerAttackRelease(name, notes.helpers.sizeToSeconds(size, bpm), time);
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

export function setSynth(synthType) {
  return {
    type: actionTypes.SET_SYNTH,
    synthType,
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
    const synth = selectors.getSynth(getState());

    if (playbackState === constants.playbackStates.STOPPED) return;

    dispatch(setPlaybackState(constants.playbackStates.STOPPED));
    dispatch(setPosition(0));

    synth.releaseAll();
    Tone.Transport.stop();
  };
}

export function togglePlayPause() {
  return (dispatch, getState) => {
    const playbackState = selectors.getPlaybackState(getState());
    const synth = selectors.getSynth(getState());

    if (playbackState !== constants.playbackStates.STARTED) {
      dispatch(setPlaybackState(constants.playbackStates.STARTED));
      Tone.Transport.start();
    } else {
      dispatch(setPlaybackState(constants.playbackStates.PAUSED));
      synth.releaseAll();
      Tone.Transport.pause();
    }
  };
}
