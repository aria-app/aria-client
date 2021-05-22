import { DiffEdit } from 'deep-diff';
import last from 'lodash/fp/last';

import { Track } from '../../../../types';
import * as actions from '../../../actions';
import { DiffInterpreter } from '../../../types';

export const interpretTrackEditedDiff: DiffInterpreter<DiffEdit<any, any>> = (
  diff,
) => {
  const id = diff.path?.[1];
  const editedProperty: keyof Track = last(diff.path);

  if (editedProperty === 'isMuted') {
    const { lhs, rhs } = diff as DiffEdit<Track['isMuted'], Track['isMuted']>;
    return actions.trackIsMutedEdited({ id, prevValue: lhs, value: rhs });
  }

  if (editedProperty === 'isSoloing') {
    const { lhs, rhs } = diff as DiffEdit<
      Track['isSoloing'],
      Track['isSoloing']
    >;
    return actions.trackIsSoloingEdited({ id, prevValue: lhs, value: rhs });
  }

  if (editedProperty === 'voice') {
    const { lhs, rhs } = diff as DiffEdit<Track['voice'], Track['voice']>;
    return actions.trackVoiceEdited({ id, prevValue: lhs, value: rhs });
  }

  if (editedProperty === 'volume') {
    const { lhs, rhs } = diff as DiffEdit<Track['volume'], Track['volume']>;
    return actions.trackVolumeEdited({ id, prevValue: lhs, value: rhs });
  }

  return actions.unknown();
};
