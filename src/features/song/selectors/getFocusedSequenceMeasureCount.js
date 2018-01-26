import getOr from 'lodash/fp/getOr';
import pipe from 'lodash/fp/pipe';
import { getFocusedSequence } from './getFocusedSequence';

export const getFocusedSequenceMeasureCount =
  pipe(
    getFocusedSequence,
    getOr(0, 'measureCount'),
  );
