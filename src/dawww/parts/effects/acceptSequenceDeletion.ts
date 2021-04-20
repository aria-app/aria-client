import getOr from 'lodash/fp/getOr';
import noop from 'lodash/fp/noop';

import * as actions from '../../actions';

export function acceptSequenceDeletion(getState, action, shared) {
  const dispatch = getOr(noop, 'dispatch', shared);
  const sequence = getOr({}, 'payload.sequence', action);

  dispatch(actions.sequenceDeletionAccepted(sequence));
}
