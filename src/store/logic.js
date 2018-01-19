import app from '../features/app';
import audioClient from '../features/audio-client';
import sequencer from '../features/sequencer';
import shortcuts from '../features/shortcuts';

export default [
  ...app.logic,
  ...audioClient.logic,
  ...sequencer.logic,
  ...shortcuts.logic,
];
