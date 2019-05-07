let state = {
  instruments: {},
  parts: {},
  song: {
    notes: {},
    sequences: {},
    tracks: {},
  },
  transportPart: {},
  volumeNodes: {},
};

export function getState() {
  return { ...state };
}

export function setState(updates) {
  state = { ...state, ...updates };
}
