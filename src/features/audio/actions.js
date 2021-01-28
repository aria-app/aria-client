import { createAction } from '@reduxjs/toolkit';

import shared from '../shared';
import song from '../song';

export const dawwwUpdatingActions = [
  ...song.actions.serverUpdatingActions,
  shared.actions.routeNotesEditorLoaded.type,
  shared.actions.routeSongEditorLoaded.type,
  shared.actions.routeSongViewerLoaded.type,
];

export const playbackStateRequestSucceeded = createAction(
  'playbackStateRequestSucceeded',
);
