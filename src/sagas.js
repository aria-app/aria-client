import playing from 'ducks/playing';
import transport from 'ducks/transport';

export default function* rootSaga() {
  yield [
    playing.sagas(),
    transport.sagas(),
  ];
}
