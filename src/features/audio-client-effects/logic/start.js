import { createLogic } from 'redux-logic';
import appData from '../../app-data';
import dawww from '../dawww';

export const start = createLogic({
  type: appData.actions.PLAYBACK_START_REQUESTED,
  process(args, dispatch, done) {
    dawww.start();

    done();
  },
});
