import * as actions from '../../actions';
import { DawwwEffects } from '../../types';

export const handleFocusedSequenceIdEdit: DawwwEffects = (
  getState,
  action,
  { dispatch, helpers, selectors, toneAdapter },
) => {
  const loopStartPoint = selectors.getLoopStartPoint(getState());
  const loopEndPoint = selectors.getLoopEndPoint(getState());

  toneAdapter.setLoopPoints(
    helpers.measuresToTime(loopStartPoint, toneAdapter),
    helpers.measuresToTime(loopEndPoint, toneAdapter),
  );

  dispatch(actions.positionSetRequested(0));
};
