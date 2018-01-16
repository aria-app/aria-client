import { loadSong } from './loadSong';
import { pause } from './pause';
import { preview } from './preview';
import { start } from './start';
import { stop } from './stop';
import { subscribeToPosition } from './subscribeToPosition';
import { subscribeToState } from './subscribeToState';
import { updateSong } from './updateSong';

export default [
  loadSong,
  pause,
  preview,
  start,
  stop,
  subscribeToPosition,
  subscribeToState,
  updateSong,
];

// Saga
// shared.actions.INITIALIZED, subscribeToPosition
//  -> Use fast event channel from server to dispatch position updates

// Overview
// position set requested -> client sends position set request to server
//
// export const POSITION_SET_REQUEST_STARTED = `${NAME}/POSITION_SET_REQUEST_STARTED`;
// export const POSITION_SET_REQUEST_SUCCEEDED = `${NAME}/POSITION_SET_REQUEST_SUCCEEDED`;
// export const SONG_POSITION_SET = `${NAME}/SONG_POSITION_SET`;
