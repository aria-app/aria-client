import * as actions from '../../actions';

export function handleFocusedSequenceIdEdit(getState, action, shared) {
  const loopStartPoint = shared.selectors.getLoopStartPoint(getState());
  const loopEndPoint = shared.selectors.getLoopEndPoint(getState());

  shared.toneAdapter.setLoopPoints(
    shared.helpers.measuresToTime(loopStartPoint, shared.toneAdapter),
    shared.helpers.measuresToTime(loopEndPoint, shared.toneAdapter),
  );

  shared.dispatch(actions.positionSetRequested(0));
}
