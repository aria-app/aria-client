import { createAction } from 'redux-starter-kit';

export const initialized = createAction('initialized');
export const routeDashboardLoaded = createAction('routeDashboardLoaded');
export const routeNotesEditorLoaded = createAction<{
  sequenceId: string;
  songId: string;
}>('routeNotesEditorLoaded');
export const routeSongEditorLoaded = createAction<{ songId: string }>(
  'routeSongEditorLoaded',
);
export const routeSongViewerLoaded = createAction<{ songId: string }>(
  'routeSongViewerLoaded',
);
