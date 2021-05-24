import * as actions from '../../actions';
import { DawwwEffects } from '../../types';

export const setPosition: DawwwEffects = (
  getState,
  action,
  { dispatch, helpers, selectors, toneAdapter },
) => {
  const { position } = action.payload;
  const loopStartPoint = selectors.getLoopStartPoint(getState());
  const positionAsTime = helpers.sizeToTime(
    loopStartPoint * 32 + position - 1,
    toneAdapter,
  );

  toneAdapter.setTransportPosition(positionAsTime);

  dispatch(actions.positionSet(position));
};
