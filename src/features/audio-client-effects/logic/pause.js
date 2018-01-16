import { createLogic } from 'redux-logic';
import appData from '../../app-data';
import dawww from '../dawww';

export const pause = createLogic({
  type: appData.actions.PLAYBACK_PAUSE_REQUESTED,
  process(args, dispatch, done) {
    dawww.pause();

    done();
  },
});
