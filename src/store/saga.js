import app from '../features/app';
import playing from '../features/playing';
import selecting from '../features/selecting';
import sequencing from '../features/sequencing';
import shared from '../features/shared';
import shortcuts from '../features/shortcuts';
import song from '../features/song';
import tracking from '../features/tracking';
import transport from '../features/transport';

export default function* saga() {
  yield [
    app.saga(),
    playing.saga(),
    selecting.saga(),
    sequencing.saga(),
    shared.saga(),
    shortcuts.saga(),
    song.saga(),
    tracking.saga(),
    transport.saga(),
  ];
}
