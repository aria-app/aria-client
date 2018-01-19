import { createLogic } from 'redux-logic';
import shared from '../../shared';
import dawww from '../dawww';

export const start = createLogic({
  type: shared.actions.PLAYBACK_START_REQUESTED,
  process(args, dispatch, done) {
    dawww.start();

    done();
  },
});
