import getOr from 'lodash/fp/getOr';
import noop from 'lodash/fp/noop';
import Tone from 'tone';
import * as actions from '../../actions';

export function setTransportPartEvents(getState, action, shared) {
  const dispatch = getOr(noop, 'dispatch', shared);
  const mapEvents = getOr(noop, 'models.part.mapEvents', shared);
  const transportPart = getOr({}, 'transportPart', getState());

  mapEvents(
    (event, index) => ({
      fn: (payload, time) => {
        const focusedSequenceId = getOr(
          '',
          'song.focusedSequenceId',
          getState(),
        );

        if (focusedSequenceId) return;

        Tone.Draw.schedule(() => {
          dispatch(actions.positionSet(payload));
        }, time);
      },
      payload: index,
    }),
    transportPart,
  );
}
