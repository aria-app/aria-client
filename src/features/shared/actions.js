import { createAction } from 'redux-starter-kit';

export const initialized = createAction('initialized');
export const routeDashboardLoaded = createAction('routeDashboardLoaded');
export const routeNotesEditorLoaded = createAction('routeNotesEditorLoaded');
export const routeSongEditorLoaded = createAction('routeSongEditorLoaded');
export const routeSongViewerLoaded = createAction('routeSongViewerLoaded');
