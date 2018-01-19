import app from '../features/app';
import audioClient from '../features/audio-client';
import sequenceEffects from '../features/sequence-effects';
import shortcuts from '../features/shortcuts';

export default [
  ...app.logic,
  ...audioClient.logic,
  ...sequenceEffects.logic,
  ...shortcuts.logic,
];
