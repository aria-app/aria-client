import { NAME } from './constants';

export const PLAYBACK_STATE_REQUEST_SUCCEEDED = `${NAME}/PLAYBACK_STATE_REQUEST_SUCCEEDED`;

export const playbackStateRequestSucceeded = playbackState => ({
  type: PLAYBACK_STATE_REQUEST_SUCCEEDED,
  playbackState,
});
