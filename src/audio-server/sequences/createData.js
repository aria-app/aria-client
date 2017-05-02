import compose from 'lodash/fp/compose';
import filter from 'lodash/fp/filter';
import getOr from 'lodash/fp/getOr';
import isEqual from 'lodash/fp/isEqual';
import map from 'lodash/fp/map';
import times from 'lodash/fp/times';
import * as helpers from '../helpers';

// createData ::
// Sequence -> Array Note -> Array Array NoteData
export default function createData(measureCount, notes) {
  return times(n =>
    compose(
      map(note => ({
        length: helpers.getNoteLength(note),
        name: helpers.getNoteName(note),
      })),
      filter(compose(
        isEqual(n),
        getOr(-1, 'points[0].x'),
      )),
    )(notes),
    measureCount * 32,
  );
}
