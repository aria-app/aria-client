import { createLogic } from 'redux-logic';
import shared from '../../shared';
import dawww from '../dawww';

export const start = createLogic({
  type: shared.actions.PLAYBACK_START_REQUEST_STARTED,
  process(args, dispatch, done) {
    dawww.start();

    done();
  },
});
