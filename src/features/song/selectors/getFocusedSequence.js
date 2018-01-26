import pipe from 'lodash/fp/pipe';
import location from '../../location';
import { getSequenceById } from './getSequenceById';

export const getFocusedSequence = state =>
  pipe(
    location.selectors.getSequenceId,
    id => getSequenceById(id)(state),
  )(state);
