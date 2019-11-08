import loadable from '@loadable/component';

export const TracksEditorContainer = loadable(() =>
  import('./TracksEditorContainer'),
);
