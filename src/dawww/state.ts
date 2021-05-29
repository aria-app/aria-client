import { State } from './types';

let state: State = {
  instruments: {},
  parts: {},
  playbackState: 'STOPPED',
  position: 0,
  song: {
    bpm: 0,
    focusedSequenceId: null,
    id: 0,
    measureCount: 0,
    notes: {},
    sequences: {},
    tracks: {},
  },
  transportPart: {},
  volumeNodes: {},
};

export function getState(): State {
  return { ...state };
}

export function setState(updates: Partial<State>): void {
  state = { ...state, ...updates };
}
