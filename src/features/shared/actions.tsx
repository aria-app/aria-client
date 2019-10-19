export const INITIALIZED = 'INITIALIZED';
export const ROUTE_DASHBOARD_LOADED = 'ROUTE_DASHBOARD_LOADED';
export const ROUTE_NOTES_EDITOR_LOADED = 'ROUTE_NOTES_EDITOR_LOADED';
export const ROUTE_SONG_EDITOR_LOADED = 'ROUTE_SONG_EDITOR_LOADED';
export const ROUTE_SONG_VIEWER_LOADED = 'ROUTE_SONG_VIEWER_LOADED';

export const initialized = () => ({
  type: INITIALIZED,
});

export const routeDashboardLoaded = () => ({
  type: ROUTE_DASHBOARD_LOADED,
});

export const routeNotesEditorLoaded = (songId, sequenceId) => ({
  type: ROUTE_NOTES_EDITOR_LOADED,
  payload: {
    sequenceId,
    songId,
  },
});

export const routeSongEditorLoaded = songId => ({
  type: ROUTE_SONG_EDITOR_LOADED,
  payload: {
    songId,
  },
});

export const routeSongViewerLoaded = songId => ({
  type: ROUTE_SONG_VIEWER_LOADED,
  payload: {
    songId,
  },
});
