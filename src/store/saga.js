import app from '../features/app';
import playback from '../features/playback';
import sequencer from '../features/sequencer';
import shared from '../features/shared';
import shortcuts from '../features/shortcuts';
import song from '../features/song';
import tracker from '../features/tracker';
import transport from '../features/transport';

export default function* saga() {
  yield [
    app.saga(),
    playback.saga(),
    sequencer.saga(),
    shared.saga(),
    shortcuts.saga(),
    song.saga(),
    tracker.saga(),
    transport.saga(),
  ];
}
