import range from 'lodash/fp/range';
import playback from '../playback';
import Tone from '../tone';

// createPart ::
// Sequence -> Array Array NoteData -> Server -> Part
export default function createPart(data) {
  const onStep = (time, step) =>
    data[step].forEach((note) => {
      playback.previewNote(note.name, note.length, time);
    });
  const steps = range(0, data.length);
  const stepSize = '32n';
  const part = Tone.createPart(onStep, steps, stepSize);

  part.start(0);

  return part;
}
