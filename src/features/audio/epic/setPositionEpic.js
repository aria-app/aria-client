import { ofType } from 'redux-observable';
import { PayloadAction } from 'redux-starter-kit';
import { ignoreElements, tap } from 'rxjs/operators';
import * as actions from '../actions';
import dawww from '../dawww';

export default function setPositionEpic(action$) {
  return action$.pipe(
    ofType(actions.positionSetRequestStarted.type),
    tap((action: PayloadAction<number>) => dawww.setPosition(action.payload)),
    ignoreElements(),
  );
}
