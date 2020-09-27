import throttle from 'lodash/fp/throttle';
import { ofType } from 'redux-observable';
import { from } from 'rxjs';
import { mergeMap, withLatestFrom } from 'rxjs/operators';

import * as actions from '../actions';
import * as helpers from '../helpers';
import * as selectors from '../selectors';

const throttledUpdate = throttle(500, (song) => helpers.updateSong(song));

export default function updateSongOnChangeEpic(action$, state$) {
  return action$.pipe(
    ofType(...actions.serverUpdatingActions),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const song = selectors.getSong(state);
      const songWithDateModified = {
        ...song,
        dateModified: Date.now(),
      };

      return from(
        throttledUpdate(songWithDateModified).then(() =>
          actions.syncSucceeded(),
        ),
      );
    }),
  );
}
