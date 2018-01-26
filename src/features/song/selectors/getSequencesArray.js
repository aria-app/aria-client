import pipe from 'lodash/fp/pipe';
import map from 'lodash/fp/map';
import { getSequenceById } from './getSequenceById';
import { getSequences } from './getSequences';

export const getSequencesArray = state => pipe(
  getSequences,
  Object.keys,
  map(id => getSequenceById(id)(state)),
)(state);
