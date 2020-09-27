import { ofType } from 'redux-observable';
import { PayloadAction } from 'redux-starter-kit';
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Song } from '../../../types';
import shared from '../../shared';
import * as actions from '../actions';

const { db } = shared.constants;

export default function deleteSongEpic(
  action$: Observable<PayloadAction<Song>>,
) {
  return action$.pipe(
    ofType(actions.songDeleteRequestStarted.type),
    mergeMap(action =>
      from(
        db
          .collection('songs')
          .doc(action.payload.id)
          .delete()
          .then(() => actions.songDeleteRequestSucceeded(action.payload)),
      ),
    ),
  );
}
