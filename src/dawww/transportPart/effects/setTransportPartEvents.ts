import getOr from 'lodash/fp/getOr';
import noop from 'lodash/fp/noop';

import * as actions from '../../actions';

export function setTransportPartEvents(getState, action, { dispatch, models }) {
  const transportPart = getOr({}, 'transportPart', getState());

  models.part.mapEvents(
    (event, index) => ({
      fn: (payload) => {
        const focusedSequenceId = getOr(
          '',
          'song.focusedSequenceId',
          getState(),
        );
        const playbackState = getOr('STOPPED', 'playbackState', getState());
        const position = getOr(0, 'position', getState());
        const shouldSetPosition =
          payload !== position &&
          (playbackState !== 'STOPPED' || payload === 0);

        if (!shouldSetPosition || focusedSequenceId) return;

        dispatch(actions.positionSet(payload));
      },
      payload: index,
    }),
    transportPart,
  );
}
