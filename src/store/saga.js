import audioClientEffects from '../features/audio-client-effects';
import sequenceEffects from '../features/sequence-effects';

export default function* saga() {
  yield [
    audioClientEffects.saga(),
    sequenceEffects.saga(),
  ];
}
