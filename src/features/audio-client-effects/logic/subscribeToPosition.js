import { createLogic } from 'redux-logic';
import audioClientData from '../../audio-client-data';
import shared from '../../shared';
import dawww from '../dawww';

export const subscribeToPosition = createLogic({
  type: shared.actions.INITIALIZED,
  processOptions: { dispatchMultiple: true },
  warnTimeout: 0,
  process(args, dispatch) {
    dawww.onPositionChange((position) => {
      dispatch(audioClientData.actions.positionRequestSucceeded(position));
    });
  },
});
