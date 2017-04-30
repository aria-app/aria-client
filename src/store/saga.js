import appEffects from '../features/app-effects';
import audioClientEffects from '../features/audio-client-effects';
import sequenceEffects from '../features/sequence-effects';
import shared from '../features/shared';
import shortcuts from '../features/shortcuts';
import tracksEffects from '../features/tracks-effects';

export default function* saga() {
  yield [
    appEffects.saga(),
    audioClientEffects.saga(),
    sequenceEffects.saga(),
    shared.saga(),
    shortcuts.saga(),
    tracksEffects.saga(),
  ];
}
