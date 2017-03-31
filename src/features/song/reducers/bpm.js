import { clamp } from 'lodash/fp';
import shared from '../../shared';
import * as actions from '../actions';

const { minBPM, maxBPM } = shared.constants;

const clampBPM = clamp(minBPM, maxBPM);

export const bpm = (state = 120, action) => {
  switch (action.type) {
    case actions.BPM_SET:
      return clampBPM(action.bpm);
    case actions.SONG_LOADED:
      return action.song.bpm;
    default:
      return state;
  }
};
