import { ofType } from 'redux-observable';
import { ignoreElements, tap } from 'rxjs/operators';
import shared from '../../shared';
import dawww from '../dawww';

export default function pausePlaybackEpic(action$) {
  return action$.pipe(
    ofType(shared.actions.PLAYBACK_PAUSE_REQUEST_STARTED),
    tap(() => dawww.pause()),
    ignoreElements(),
  );
}
