import getOr from 'lodash/fp/getOr';

import * as actions from '../../actions';

export function reloadSequence(getState, action, shared) {
  const id = getOr('', 'payload.id', action);
  const sequence = getOr({}, `song.sequences[${id}]`, getState());

  shared.dispatch(actions.sequenceDeletionRequested(sequence));
  shared.dispatch(actions.sequenceAdded(sequence));
}
