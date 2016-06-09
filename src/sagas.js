import notes from 'ducks/notes';
import playing from 'ducks/playing';
import song from 'ducks/song';
import transport from 'ducks/transport';

export default function* rootSaga() {
  yield [
    notes.sagas(),
    playing.sagas(),
    song.sagas(),
    transport.sagas(),
  ];
}
