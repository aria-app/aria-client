import getOr from 'lodash/fp/getOr';
import noop from 'lodash/fp/noop';

export function startPart(getState, action, shared) {
  const measuresToTime = getOr(noop, 'helpers.measuresToTime', shared);
  const startAtTime = getOr(noop, 'models.part.startAtTime', shared);
  const sequence = getOr({}, 'payload.sequence', action);
  const sequenceId = getOr('', 'id', sequence);
  const position = getOr(0, 'position', sequence);
  const part = getOr({}, `parts[${sequenceId}]`, getState());

  startAtTime(measuresToTime(position, shared.toneAdapter), part);
}
