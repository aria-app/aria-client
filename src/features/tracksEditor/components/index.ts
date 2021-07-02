import loadable from '@loadable/component';

export const TracksEditor = loadable(() => import('./TracksEditor'), {
  resolveComponent: (components) => components.TracksEditor,
});
