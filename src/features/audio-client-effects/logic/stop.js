import { createLogic } from 'redux-logic';
import shared from '../../shared';
import dawww from '../dawww';

export const stop = createLogic({
  type: shared.actions.PLAYBACK_STOP_REQUESTED,
  process(args, dispatch, done) {
    dawww.stop();

    done();
  },
});
