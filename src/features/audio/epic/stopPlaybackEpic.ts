import { ofType } from 'redux-observable';
import { ignoreElements, tap } from 'rxjs/operators';
import * as actions from '../actions';
import dawww from '../dawww';

export default function stopPlaybackEpic(action$) {
  return action$.pipe(
    ofType(actions.playbackStopRequestStarted.type),
    tap(() => dawww.stop()),
    ignoreElements(),
  );
}
