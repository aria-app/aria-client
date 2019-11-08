import loadable from '@loadable/component';

export const NotesEditorContainer = loadable(() =>
  import('./NotesEditorContainer'),
);
