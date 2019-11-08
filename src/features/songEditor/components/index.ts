import loadable from '@loadable/component';

export const SongEditorContainer = loadable(() =>
  import('./SongEditorContainer'),
);
