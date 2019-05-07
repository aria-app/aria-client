import getOr from 'lodash/fp/getOr';
import noop from 'lodash/fp/noop';
import * as actions from '../../actions';

export function setPosition(getState, action, shared) {
  const dispatch = getOr(noop, 'dispatch', shared);
  const sizeToTime = getOr(noop, 'helpers.sizeToTime', shared);
  const getLoopStartPoint = getOr(noop, 'selectors.getLoopStartPoint', shared);
  const setTransportPosition = getOr(
    noop,
    'toneAdapter.setTransportPosition',
    shared,
  );
  const loopStartPoint = getLoopStartPoint(getState());
  const position = getOr(0, 'payload.position', action);
  const positionAsTime = sizeToTime(
    loopStartPoint * 32 + position - 1,
    shared.toneAdapter,
  );

  setTransportPosition(positionAsTime);

  dispatch(actions.positionSet(position));
}
