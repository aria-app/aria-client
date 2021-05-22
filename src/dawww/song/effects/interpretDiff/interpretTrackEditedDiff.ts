import { DiffEdit } from 'deep-diff';
import first from 'lodash/fp/first';
import last from 'lodash/fp/last';

import * as actions from '../../../actions';
import { DawwwTrack, DiffInterpreter } from '../../../types';

export const interpretTrackEditedDiff: DiffInterpreter<DiffEdit<any, any>> = (
  diff,
) => {
  const id = first(diff.path);
  const editedProperty: keyof DawwwTrack = last(diff.path);

  if (editedProperty === 'isMuted') {
    const { lhs, rhs } = diff as DiffEdit<
      DawwwTrack['isMuted'],
      DawwwTrack['isMuted']
    >;
    return actions.trackIsMutedEdited({ id, prevValue: lhs, value: rhs });
  }

  if (editedProperty === 'isSoloing') {
    const { lhs, rhs } = diff as DiffEdit<
      DawwwTrack['isSoloing'],
      DawwwTrack['isSoloing']
    >;
    return actions.trackIsSoloingEdited({ id, prevValue: lhs, value: rhs });
  }

  if (editedProperty === 'voice') {
    const { lhs, rhs } = diff as DiffEdit<
      DawwwTrack['voice'],
      DawwwTrack['voice']
    >;
    return actions.trackVoiceEdited({ id, prevValue: lhs, value: rhs });
  }

  if (editedProperty === 'volume') {
    const { lhs, rhs } = diff as DiffEdit<
      DawwwTrack['volume'],
      DawwwTrack['volume']
    >;
    return actions.trackVolumeEdited({ id, prevValue: lhs, value: rhs });
  }

  return actions.unknown();
};
