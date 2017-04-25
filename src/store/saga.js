import appEffects from '../features/app-effects';
import audioClient from '../features/audio-client';
import sequenceEffects from '../features/sequence-effects';
import shared from '../features/shared';
import shortcuts from '../features/shortcuts';
import song from '../features/song';
import tracksEffects from '../features/tracks-effects';

export default function* saga() {
  yield [
    appEffects.saga(),
    audioClient.saga(),
    sequenceEffects.saga(),
    shared.saga(),
    shortcuts.saga(),
    song.saga(),
    tracksEffects.saga(),
  ];
}
