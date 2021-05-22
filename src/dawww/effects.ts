import instrumentsEffects from './instruments/effects';
import partsEffects from './parts/effects';
import playbackStateEffects from './playbackState/effects';
import positionEffects from './position/effects';
import songEffects from './song/effects';
import { transportPartEffects } from './transportPart/effects';
import { DawwwEffects } from './types';
import { volumeNodesEffects } from './volumeNodes/effects';

export const effects: DawwwEffects = (getState, action, shared) => {
  instrumentsEffects(getState, action, shared);
  partsEffects(getState, action, shared);
  playbackStateEffects(getState, action, shared);
  positionEffects(getState, action, shared);
  songEffects(getState, action, shared);
  transportPartEffects(getState, action, shared);
  volumeNodesEffects(getState, action, shared);
};
