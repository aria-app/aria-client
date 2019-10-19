import { ofType } from 'redux-observable';
import { ignoreElements, tap } from 'rxjs/operators';
import shared from '../../shared';
import dawww from '../dawww';

export default function startPlaybackEpic(action$) {
  return action$.pipe(
    ofType(shared.actions.PLAYBACK_START_REQUEST_STARTED),
    tap(() => dawww.start()),
    ignoreElements(),
  );
}
