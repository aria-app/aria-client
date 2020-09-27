import { ofType } from 'redux-observable';
import { ignoreElements, tap, withLatestFrom } from 'rxjs/operators';
import song from '../../song';
import dawww from '../dawww';
import * as selectors from '../selectors';

export default function loadSongEpic(action$, state$) {
  return action$.pipe(
    ofType(song.actions.songLoaded.type),
    withLatestFrom(state$),
    tap(([action, state]) => {
      const focusedSequenceId = selectors.getFocusedSequenceId(state);

      dawww.updateSong({ ...action.payload, focusedSequenceId });
    }),
    ignoreElements(),
  );
}
