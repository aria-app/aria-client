import stubArray from 'lodash/fp/stubArray';
import times from 'lodash/fp/times';
// sequence = {
//   trackId: 'a',
//   data: [[{ name: 'C4', length: '(4 * 32n)' }][][][] ... 32xMC total ... [][][]],
//   position: 2, // With this value, would be offset by 2 measures
// };

//           createSequence :: SequenceModel -> Array NotesModel -> Sequence
export const createSequence = (sequence, notes) => {
  const data = getData(notes);
  const id = '';
  const measureCount = 0;
  const position = 0;
  const trackId = '';

  return {
    data,
    id,
    measureCount,
    position,
    trackId,
  };
};

function getData() {
  return times(stubArray, 32);
}
