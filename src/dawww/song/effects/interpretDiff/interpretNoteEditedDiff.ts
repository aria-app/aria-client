import { DiffEdit } from 'deep-diff';
import first from 'lodash/fp/first';
import last from 'lodash/fp/last';

import { Point } from '../../../../types';
import * as actions from '../../../actions';
import { DawwwNote, DiffInterpreter } from '../../../types';

export const interpretNoteEditedDiff: DiffInterpreter<DiffEdit<any, any>> = (
  diff,
) => {
  const id = first(diff.path);
  const editedProperty: keyof DawwwNote | keyof Point = last(diff.path);
  const index = diff.path?.[2];

  if (editedProperty === 'x') {
    const { lhs, rhs } = diff as DiffEdit<
      DawwwNote['points'][number]['x'],
      DawwwNote['points'][number]['x']
    >;
    return actions.notePointXEdited({ id, index, prevValue: lhs, value: rhs });
  }

  if (editedProperty === 'y') {
    const { lhs, rhs } = diff as DiffEdit<
      DawwwNote['points'][number]['y'],
      DawwwNote['points'][number]['y']
    >;
    return actions.notePointYEdited({ id, index, prevValue: lhs, value: rhs });
  }

  return actions.unknown();
};
