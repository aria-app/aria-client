import app from 'ducks/app';
import moving from 'ducks/moving';
import notes from 'ducks/notes';
import panning from 'ducks/panning';
import playing from 'ducks/playing';
import resizing from 'ducks/resizing';
import selecting from 'ducks/selecting';
import song from 'ducks/song';
import transport from 'ducks/transport';

export default function* rootSaga() {
  yield [
    app.sagas(),
    moving.sagas(),
    notes.sagas(),
    panning.sagas(),
    playing.sagas(),
    resizing.sagas(),
    selecting.sagas(),
    song.sagas(),
    transport.sagas(),
  ];
}
