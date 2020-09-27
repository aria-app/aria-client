import { createAction } from 'redux-starter-kit';

import shared from '../shared';
import song from '../song';

export const dawwwUpdatingActions = [
  ...song.actions.serverUpdatingActions,
  shared.actions.routeNotesEditorLoaded.type,
  shared.actions.routeSongEditorLoaded.type,
  shared.actions.routeSongViewerLoaded.type,
];

export const playbackPauseRequestStarted = createAction(
  'playbackPauseRequestStarted',
);
export const playbackStartRequestStarted = createAction(
  'playbackStartRequestStarted',
);
export const playbackStateRequestSucceeded = createAction(
  'playbackStateRequestSucceeded',
);
export const playbackStopRequestStarted = createAction(
  'playbackStopRequestStarted',
);
export const positionRequestSucceeded = createAction(
  'positionRequestSucceeded',
);
export const positionSetRequestStarted = createAction(
  'positionSetRequestStarted',
);
