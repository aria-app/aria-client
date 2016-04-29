import Tone from 'tone';
import _ from 'lodash';
import { createSynth, getType } from './helpers';
import sequence from 'modules/sequence';

const soundState = {
  bpm: undefined,
  dispatch: undefined,
  measureCount: undefined,
  notes: undefined,
  playbackState: undefined,
  toneSequence: undefined,
  synth: undefined,
};

export function setDispatch(dispatch) {
  soundState.dispatch = dispatch;
}

export function initializeState(state, dispatch) {
  soundState.bpm = sequence.selectors.getBpm(state);
  soundState.dispatch = dispatch;
  soundState.measureCount = sequence.selectors.getMeasureCount(state);
  soundState.notes = sequence.selectors.getNotes(state);
  soundState.playbackState = sequence.selectors.getPlaybackState(state);
  soundState.synth = createSynth(sequence.selectors.getSynth(state));

  initializeSequence();
}

export function playNote(frequency, length = '32n', time) {
  soundState.synth.triggerAttackRelease(frequency, length, time);
}

export function updateState(state) {
  const { measureCount, notes, synth } = sequence.selectors.get(state);

  if (!_.isEqual(synth, getType(soundState.synth))) {
    soundState.synth = createSynth(synth);
  }

  if (!_.isEqual(measureCount, soundState.measureCount)) {
    soundState.measureCount = measureCount;
  }

  if (!_.isEqual(notes, soundState.notes)) {
    soundState.notes = notes;
  }
}

function initializeSequence() {
  // NOTE: If playback isn't working, check that measureCount comes through.
  soundState.toneSequence = new Tone.Sequence((time, step) => {
    soundState.dispatch(sequence.actions.setPosition(step));
    _.filter(soundState.notes, note => note.time === step)
      .forEach(note => {
        playNote(note.frequency, note.length, time);
      });
  }, _.range(soundState.measureCount * 32), '32n');

  soundState.toneSequence.start();
}
