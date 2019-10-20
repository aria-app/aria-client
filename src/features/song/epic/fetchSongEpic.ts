import isEmpty from 'lodash/fp/isEmpty';
import isEqual from 'lodash/fp/isEqual';
import { ofType } from 'redux-observable';
import { from } from 'rxjs';
import { mergeMap, withLatestFrom } from 'rxjs/operators';
import shared from '../../shared';
import { Song } from '../../shared/types';
import * as actions from '../actions';
import { fetchSongById } from '../helpers';
import * as selectors from '../selectors';

export default function fetchSongEpic(action$, state$) {
  return action$.pipe(
    ofType(
      shared.actions.ROUTE_NOTES_EDITOR_LOADED,
      shared.actions.ROUTE_SONG_EDITOR_LOADED,
      shared.actions.ROUTE_SONG_VIEWER_LOADED,
    ),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      return from(
        fetchSongById(action.payload.songId).then(song => {
          const prevSong = selectors.getSong(state);

          if (isEmpty(song) || isEqual(prevSong, song)) {
            return;
          }

          return actions.songLoaded(song as Song);
        }),
      );
    }),
  );
}
