import getOr from 'lodash/fp/getOr';
import noop from 'lodash/fp/noop';

export function disablePartLooping(getState, action, shared) {
  const disableLooping = getOr(noop, 'models.part.disableLooping', shared);
  const sequence = getOr({}, 'payload.sequence', action);
  const sequenceId = getOr('', 'id', sequence);
  const part = getOr({}, `parts[${sequenceId}]`, getState());

  disableLooping(part);
}
