import { ofType } from 'redux-observable';
import { ignoreElements, tap } from 'rxjs/operators';
import * as actions from '../actions';
import dawww from '../dawww';

export default function startPlaybackEpic(action$) {
  return action$.pipe(
    ofType(actions.playbackStartRequestStarted.type),
    tap(() => dawww.start()),
    ignoreElements(),
  );
}
