import { clamp } from 'lodash/fp';
import { createReducer } from 'redux-create-reducer';
import shared from '../../shared';
import * as actions from '../actions';

const { minBPM, maxBPM } = shared.constants;

const clampBPM = clamp(minBPM, maxBPM);

export const bpm = createReducer(120, {
  [actions.BPM_SET]: (state, action) =>
    clampBPM(action.bpm),

  [actions.SONG_LOADED]: (state, action) =>
    action.song.bpm,
});
