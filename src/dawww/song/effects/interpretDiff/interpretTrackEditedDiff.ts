import getOr from 'lodash/fp/getOr';
import last from 'lodash/fp/last';

import * as actions from '../../../actions';

export function interpretTrackEditedDiff(diff) {
  const id = getOr([], 'path[1]', diff);
  const prevValue = getOr('', 'lhs', diff);
  const value = getOr('', 'rhs', diff);

  switch (last(getOr([], 'path', diff))) {
    case 'isMuted':
      return actions.trackIsMutedEdited({ id, prevValue, value });
    case 'isSoloing':
      return actions.trackIsSoloingEdited({ id, prevValue, value });
    case 'voice':
      return actions.trackVoiceEdited({ id, prevValue, value });
    case 'volume':
      return actions.trackVolumeEdited({ id, prevValue, value });
    default:
      return actions.unknown();
  }
}
