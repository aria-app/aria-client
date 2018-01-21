import { clamp } from 'lodash/fp';
import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';

const { minBPM, maxBPM } = shared.constants;

const clampBPM = clamp(minBPM, maxBPM);

export const bpm = createReducer(120, {
  [shared.actions.BPM_SET]: (state, action) =>
    clampBPM(action.payload.bpm),

  [shared.actions.SONG_LOADED]: (state, action) =>
    action.payload.song.bpm,
});
