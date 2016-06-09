import moving from 'ducks/moving';
import notes from 'ducks/notes';
import panning from 'ducks/panning';
import playing from 'ducks/playing';
import song from 'ducks/song';
import transport from 'ducks/transport';

export default function* rootSaga() {
  yield [
    moving.sagas(),
    notes.sagas(),
    panning.sagas(),
    playing.sagas(),
    song.sagas(),
    transport.sagas(),
  ];
}
