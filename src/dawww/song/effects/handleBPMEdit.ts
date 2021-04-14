import getOr from 'lodash/fp/getOr';

export function handleBPMEdit(getState, action, shared) {
  const bpm = getOr(0, 'payload.bpm', action);

  shared.toneAdapter.setBPM(bpm);
}
