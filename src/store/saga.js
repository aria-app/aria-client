import appEffects from '../features/app-effects';
import audioClientEffects from '../features/audio-client-effects';
import sequenceEffects from '../features/sequence-effects';
import shared from '../features/shared';
import shortcuts from '../features/shortcuts';

export default function* saga() {
  yield [
    appEffects.saga(),
    audioClientEffects.saga(),
    sequenceEffects.saga(),
    shared.saga(),
    shortcuts.saga(),
  ];
}
