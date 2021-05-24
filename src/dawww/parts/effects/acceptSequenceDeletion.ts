import * as actions from '../../actions';
import { DawwwEffects } from '../../types';

export const acceptSequenceDeletion: DawwwEffects = (
  getState,
  action,
  { dispatch },
) => {
  const { sequence } = action.payload;

  dispatch(actions.sequenceDeletionAccepted(sequence));
};
