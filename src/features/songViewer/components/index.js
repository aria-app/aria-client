import loadable from '@loadable/component';

export const SongViewerContainer = loadable(() =>
  import('./SongViewerContainer'),
);
