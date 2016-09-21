import app from '../ducks/app';
import moving from '../ducks/moving';
import notes from '../ducks/notes';
import panning from '../ducks/panning';
import playing from '../ducks/playing';
import resizing from '../ducks/resizing';
import selecting from '../ducks/selecting';
import sequencing from '../ducks/sequencing';
import shortcuts from '../ducks/shortcuts';
import song from '../ducks/song';
import tracking from '../ducks/tracking';
import transport from '../ducks/transport';

export default function* saga() {
  yield [
    app.sagas(),
    moving.sagas(),
    notes.sagas(),
    panning.sagas(),
    playing.sagas(),
    resizing.sagas(),
    selecting.sagas(),
    sequencing.sagas(),
    shortcuts.sagas(),
    song.sagas(),
    tracking.sagas(),
    transport.sagas(),
  ];
}
