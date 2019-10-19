import { createAction } from 'redux-starter-kit';
import shared from '../shared';

export const dawwwUpdatingActions = [
  ...shared.actions.serverUpdatingActions,
  shared.actions.ROUTE_NOTES_EDITOR_LOADED,
  shared.actions.ROUTE_SONG_EDITOR_LOADED,
  shared.actions.ROUTE_SONG_VIEWER_LOADED,
];

export const playbackPauseRequestStarted = createAction(
  'playbackPauseRequestStarted',
);
export const playbackStartRequestStarted = createAction(
  'playbackStartRequestStarted',
);
export const playbackStateRequestSucceeded = createAction<string>(
  'playbackStateRequestSucceeded',
);
export const playbackStopRequestStarted = createAction(
  'playbackStopRequestStarted',
);
export const positionRequestSucceeded = createAction<number>(
  'positionRequestSucceeded',
);
export const positionSetRequestStarted = createAction<number>(
  'positionSetRequestStarted',
);
