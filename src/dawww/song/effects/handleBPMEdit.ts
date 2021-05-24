import { DawwwEffects } from '../../types';

export const handleBPMEdit: DawwwEffects = (getState, action, shared) => {
  const { bpm } = action.payload;

  shared.toneAdapter.setBPM(bpm);
};
