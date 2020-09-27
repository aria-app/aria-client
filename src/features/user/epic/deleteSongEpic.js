import { ofType } from 'redux-observable';
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import shared from '../../shared';
import * as actions from '../actions';

const { db } = shared.constants;

export default function deleteSongEpic(action$) {
  return action$.pipe(
    ofType(actions.songDeleteRequestStarted.type),
    mergeMap((action) =>
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
