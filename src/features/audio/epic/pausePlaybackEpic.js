import { ofType } from 'redux-observable';
import { ignoreElements, tap } from 'rxjs/operators';
import * as actions from '../actions';
import dawww from '../dawww';

export default function pausePlaybackEpic(action$) {
  return action$.pipe(
    ofType(actions.playbackPauseRequestStarted.type),
    tap(() => dawww.pause()),
    ignoreElements(),
  );
}
