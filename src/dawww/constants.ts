import { rangeStep } from 'lodash/fp';

import { PlaybackState } from '../types';

export const BPM_RANGE = rangeStep(10, 60, 401);
export const DEFAULT_BPM = 120;
export const DEFAULT_MEASURE_COUNT = 4;
export const DEFAULT_SONG_NAME = 'New Song';
export const DEFAULT_VOICE = 'SQUARE';
export const MAX_BPM = 400;
export const MIN_BPM = 60;
export const OCTAVE_RANGE = [0, 1, 2, 3, 4, 5, 6];
export const PLAYBACK_STATES: Record<PlaybackState, PlaybackState> = {
  PAUSED: 'PAUSED',
  STARTED: 'STARTED',
  STOPPED: 'STOPPED',
};
export const VOICES = {
  fatsawtooth: 'fatsawtooth',
  fatsine: 'fatsine',
  fatsquare: 'fatsquare',
  fattriangle: 'fattriangle',
  pulse: 'pulse',
  pwm: 'pwm',
  sawtooth: 'sawtooth',
  sine: 'sine',
  square: 'square',
  triangle: 'triangle',
};
