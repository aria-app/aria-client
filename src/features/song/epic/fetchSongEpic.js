import isEmpty from 'lodash/fp/isEmpty';
import isEqual from 'lodash/fp/isEqual';
import { ofType } from 'redux-observable';
import { from } from 'rxjs';
import { mergeMap, withLatestFrom } from 'rxjs/operators';
import shared from '../../shared';
import * as actions from '../actions';
import { fetchSongById } from '../helpers';
import * as selectors from '../selectors';

export default function fetchSongEpic(action$, state$) {
  return action$.pipe(
    ofType(
      shared.actions.routeNotesEditorLoaded.type,
      shared.actions.routeSongEditorLoaded.type,
      shared.actions.routeSongViewerLoaded.type,
    ),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      return from(
        fetchSongById(action.payload.songId).then((song) => {
          const prevSong = selectors.getSong(state);

          if (isEmpty(song) || isEqual(prevSong, song)) {
            return;
          }

          return actions.songLoaded(song);
        }),
      );
    }),
  );
}
