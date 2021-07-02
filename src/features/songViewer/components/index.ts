import loadable from '@loadable/component';

export const SongViewer = loadable(() => import('./SongViewer'), {
  resolveComponent: (components) => components.SongViewer,
});
