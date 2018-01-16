import appEffects from '../features/app-effects';
import audioClientEffects from '../features/audio-client-effects';
import sequenceEffects from '../features/sequence-effects';
import shortcuts from '../features/shortcuts';

export default [
  ...appEffects.logic,
  ...audioClientEffects.logic,
  ...sequenceEffects.logic,
  ...shortcuts.logic,
];
