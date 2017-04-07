import app from '../features/app';
import sequencer from '../features/sequencer';
import shared from '../features/shared';
import shortcuts from '../features/shortcuts';
import song from '../features/song';
import trackView from '../features/track-view';

export default function* saga() {
  yield [
    app.saga(),
    sequencer.saga(),
    shared.saga(),
    shortcuts.saga(),
    song.saga(),
    trackView.saga(),
  ];
}
