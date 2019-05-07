import getOr from 'lodash/fp/getOr';
import noop from 'lodash/fp/noop';

export function stopPart(getState, action, shared) {
  const stop = getOr(noop, 'models.part.stop', shared);
  const sequence = getOr({}, 'payload.sequence', action);
  const sequenceId = getOr('', 'id', sequence);
  const part = getOr({}, `parts[${sequenceId}]`, getState());

  stop(part);
}
