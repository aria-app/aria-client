import { createAction } from '@reduxjs/toolkit';

export const initialized = createAction('initialized');
export const routeNotesEditorLoaded = createAction('routeNotesEditorLoaded');
export const routeSongEditorLoaded = createAction('routeSongEditorLoaded');
export const routeSongViewerLoaded = createAction('routeSongViewerLoaded');
