import * as actions from '../../actions';
import { DawwwEffects } from '../../types';

export const reloadSequence: DawwwEffects = (
  getState,
  action,
  { dispatch },
) => {
  const { id } = action.payload;
  const { song } = getState();

  dispatch(actions.sequenceDeletionRequested(song.sequences[id]));
  dispatch(actions.sequenceAdded(song.sequences[id]));
};
