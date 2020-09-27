import { createStructuredSelector } from 'reselect';

import { getBPM } from './getBPM';
import { getId } from './getId';
import { getMeasureCount } from './getMeasureCount';
import { getName } from './getName';
import { getNotes } from './getNotes';
import { getSequences } from './getSequences';
import { getTracks } from './getTracks';
import { getUserId } from './getUserId';

export const getSong = createStructuredSelector({
  bpm: getBPM,
  id: getId,
  measureCount: getMeasureCount,
  name: getName,
  notes: getNotes,
  sequences: getSequences,
  tracks: getTracks,
  userId: getUserId,
});
