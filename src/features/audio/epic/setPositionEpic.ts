import { ofType } from 'redux-observable';
import { ignoreElements, tap } from 'rxjs/operators';
import shared from '../../shared';
import dawww from '../dawww';

export default function setPositionEpic(action$) {
  return action$.pipe(
    ofType(shared.actions.POSITION_SET_REQUEST_STARTED),
    tap((action: { [key: string]: any }) =>
      dawww.setPosition(action.payload.position),
    ),
    ignoreElements(),
  );
}
