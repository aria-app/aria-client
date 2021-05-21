import { StateRoot } from './types';

let state: StateRoot = {
  instruments: {},
  parts: {},
  playbackState: 'STOPPED',
  position: 0,
  song: {
    notes: {},
    sequences: {},
    tracks: {},
  },
  transportPart: {},
  volumeNodes: {},
};

export function getState(): StateRoot {
  return { ...state };
}

export function setState(updates: Partial<StateRoot>): void {
  state = { ...state, ...updates };
}
