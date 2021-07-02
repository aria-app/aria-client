import loadable from '@loadable/component';

export const NotesEditor = loadable(() => import('./NotesEditor'), {
  resolveComponent: (components) => components.NotesEditor,
});
