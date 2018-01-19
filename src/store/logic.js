import app from '../features/app';
import audioClientEffects from '../features/audio-client-effects';
import sequenceEffects from '../features/sequence-effects';
import shortcuts from '../features/shortcuts';

export default [
  ...app.logic,
  ...audioClientEffects.logic,
  ...sequenceEffects.logic,
  ...shortcuts.logic,
];
