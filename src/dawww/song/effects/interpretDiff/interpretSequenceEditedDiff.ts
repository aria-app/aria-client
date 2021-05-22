import { DiffEdit } from 'deep-diff';
import first from 'lodash/fp/first';
import last from 'lodash/fp/last';

import * as actions from '../../../actions';
import { DawwwSequence, DiffInterpreter } from '../../../types';

export const interpretSequenceEditedDiff: DiffInterpreter<
  DiffEdit<any, any>
> = (diff) => {
  const id = first(diff.path);
  const editedProperty: keyof DawwwSequence = last(diff.path);

  if (editedProperty === 'measureCount') {
    const { lhs, rhs } = diff as DiffEdit<
      DawwwSequence['measureCount'],
      DawwwSequence['measureCount']
    >;
    return actions.trackIsMutedEdited({ id, prevValue: lhs, value: rhs });
  }

  if (editedProperty === 'position') {
    const { lhs, rhs } = diff as DiffEdit<
      DawwwSequence['position'],
      DawwwSequence['position']
    >;
    return actions.sequencePositionEdited({ id, prevValue: lhs, value: rhs });
  }

  if (editedProperty === 'trackId') {
    const { lhs, rhs } = diff as DiffEdit<
      DawwwSequence['trackId'],
      DawwwSequence['trackId']
    >;
    return actions.sequenceTrackIdEdited({ id, prevValue: lhs, value: rhs });
  }

  return actions.unknown();
};
