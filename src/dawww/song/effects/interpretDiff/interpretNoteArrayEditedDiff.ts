import { DiffArray } from 'deep-diff';
import first from 'lodash/fp/first';

import * as actions from '../../../actions';
import { DawwwNote, DiffInterpreter } from '../../../types';

export const interpretNoteArrayEditedDiff: DiffInterpreter<
  DiffArray<DawwwNote, DawwwNote>
> = ({ index, item, path }) => {
  const id = first(path);

  switch (item.kind) {
    case 'D':
      return actions.notePointDeleted({ id, index, prevValue: item.lhs });
    case 'N':
      return actions.notePointAdded({ id, index, value: item.rhs });
    default:
      return actions.unknown();
  }
};
