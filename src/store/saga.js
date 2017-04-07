import app from '../features/app';
import audioClient from '../features/audio-client';
import sequenceView from '../features/sequence-view';
import shared from '../features/shared';
import shortcuts from '../features/shortcuts';
import song from '../features/song';
import trackView from '../features/track-view';

export default function* saga() {
  yield [
    app.saga(),
    audioClient.saga(),
    sequenceView.saga(),
    shared.saga(),
    shortcuts.saga(),
    song.saga(),
    trackView.saga(),
  ];
}
