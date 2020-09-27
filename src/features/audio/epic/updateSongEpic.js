import { ofType } from 'redux-observable';
import { ignoreElements, tap, withLatestFrom } from 'rxjs/operators';
import song from '../../song';
import * as actions from '../actions';
import dawww from '../dawww';
import * as selectors from '../selectors';

export default function updateSongEpic(action$, state$) {
  return action$.pipe(
    ofType(...actions.dawwwUpdatingActions),
    withLatestFrom(state$),
    tap(([action, state]) => {
      const songState = song.selectors.getSong(state);
      const focusedSequenceId = selectors.getFocusedSequenceId(state) || '';

      dawww.updateSong({ ...songState, focusedSequenceId });
    }),
    ignoreElements(),
  );
}
