import { createLogic } from 'redux-logic';
import appData from '../../app-data';
import dawww from '../dawww';

export const stop = createLogic({
  type: appData.actions.PLAYBACK_STOP_REQUESTED,
  process(args, dispatch, done) {
    dawww.stop();

    done();
  },
});
