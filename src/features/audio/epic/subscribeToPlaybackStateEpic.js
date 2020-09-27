import { ofType } from 'redux-observable';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import shared from '../../shared';
import * as actions from '../actions';
import dawww from '../dawww';

export default function subscribeToPlaybackStateEpic(action$) {
  return action$.pipe(
    ofType(shared.actions.initialized.type),
    mergeMap(() =>
      Observable.create((observer) =>
        dawww.onStateChange((playbackState) => {
          observer.next(actions.playbackStateRequestSucceeded(playbackState));
        }),
      ),
    ),
  );
}
