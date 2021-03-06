import loadable from '@loadable/component';

export const SongEditor = loadable(() => import('./SongEditor'), {
  resolveComponent: (components) => components.SongEditor,
});
