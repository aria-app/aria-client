import { NAME } from './constants';

export const PLAYBACK_STATE_REQUEST_SUCCEEDED = `${NAME}/PLAYBACK_STATE_REQUEST_SUCCEEDED`;
export const POSITION_REQUEST_SUCCEEDED = `${NAME}/POSITION_REQUEST_SUCCEEDED`;

export const playbackStateRequestSucceeded = playbackState => ({
  type: PLAYBACK_STATE_REQUEST_SUCCEEDED,
  playbackState,
});

export const positionRequestSucceeded = position => ({
  type: POSITION_REQUEST_SUCCEEDED,
  position,
});
