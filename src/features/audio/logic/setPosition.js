import { createLogic } from 'redux-logic';
import shared from '../../shared';
import dawww from '../dawww';

export const setPosition = createLogic({
  type: shared.actions.POSITION_SET_REQUEST_STARTED,
  process({ action }, dispatch, done) {
    dawww.setPosition(action.payload.position);

    done();
  },
});
