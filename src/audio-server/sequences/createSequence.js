import createData from './createData';
import createPart from './createPart';

// createSequence ::
// options -> Array Note -> Server -> Sequence
export default function createSequence({ id, measureCount, notes, position, trackId }) {
  const data = createData(measureCount, notes);
  return {
    part: createPart(data),
    data,
    id,
    measureCount,
    position,
    trackId,
  };
}
