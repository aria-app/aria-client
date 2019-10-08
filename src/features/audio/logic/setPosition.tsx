import { createLogic, Logic } from 'redux-logic';
import shared from '../../shared';
import dawww from '../dawww';

interface Payload {
  position?: number;
}

interface Action {
  type?: string;
  payload?: Payload;
}

interface Dependencies {
  action?: Action;
  [key: string]: any;
}

type LogicType = Logic<any, Payload, any, Dependencies, any, string>;

export const setPosition: LogicType = createLogic({
  type: shared.actions.POSITION_SET_REQUEST_STARTED,
  process({ action }, dispatch, done) {
    dawww.setPosition(action.payload.position);

    done();
  },
});
