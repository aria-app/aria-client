import * as actions from '../../actions';
import { DawwwEffects } from '../../types';

export const setTransportPartEvents: DawwwEffects = (
  getState,
  action,
  { dispatch, models },
) => {
  const { transportPart } = getState();

  models.part.mapEvents(
    (event, index) => ({
      fn: (payload) => {
        const { playbackState, position, song } = getState();
        const { focusedSequenceId } = song;
        const shouldSetPosition =
          !focusedSequenceId &&
          payload !== position &&
          (playbackState !== 'STOPPED' || payload === 0);

        if (!shouldSetPosition) return;

        dispatch(actions.positionSet(payload));
      },
      payload: index,
    }),
    transportPart,
  );
};
