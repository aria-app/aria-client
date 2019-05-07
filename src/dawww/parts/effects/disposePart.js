import getOr from 'lodash/fp/getOr';
import noop from 'lodash/fp/noop';

export function disposePart(getState, action, shared) {
  const dispose = getOr(noop, 'models.part.dispose', shared);
  const sequenceId = getOr('', 'payload.sequence.id', action);
  const part = getOr({}, `parts[${sequenceId}]`, getState());

  dispose(part);
}
