import appEffects from '../features/app-effects';
import sequenceEffects from '../features/sequence-effects';
import shortcuts from '../features/shortcuts';

export default [
  ...appEffects.logic,
  ...sequenceEffects.logic,
  ...shortcuts.logic,
];
