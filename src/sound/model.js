import { createSynth, getType } from './helpers';

const state = {
  synth: undefined,
};

export function updateState(reducerState) {
  if (state.synth === undefined || reducerState.sequence.synth !== getType(state.synth)) {
    state.synth = createSynth(reducerState.sequence.synth);
  }
}

export function playNote(frequency, length, time) {
  state.synth.triggerAttackRelease(frequency, length, time);
}
