import { createLogic } from 'redux-logic';
import audioClientData from '../../audio-client-data';
import shared from '../../shared';
import dawww from '../dawww';

export const subscribeToState = createLogic({
  type: shared.actions.INITIALIZED,
  processOptions: { dispatchMultiple: true },
  warnTimeout: 0,
  process(args, dispatch) {
    dawww.onStateChange((playbackState) => {
      dispatch(audioClientData.actions.playbackStateRequestSucceeded(playbackState));
    });
  },
});
