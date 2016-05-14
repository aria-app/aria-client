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
      dispatch(setPosition(step));

      const notesAtStep = _.filter(
        notes.selectors.getNotes(getState()),
        note => note.position.x === step
      );

      const synth = selectors.getSynth(getState());

      _.uniqBy(notesAtStep, 'name').forEach(note => {
        const length = notes.helpers.slotsToLength(note.slots);
        synth.triggerAttack(note.name, time);
        synth.triggerRelease(note.name, `+${length}`);
      }
      );
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

export function playNote(name, slots = 1, time) {
  return (dispatch, getState) => {
    const synth = selectors.getSynth(getState());

    synth.triggerAttackRelease(name, notes.helpers.slotsToLength(slots), time);
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
