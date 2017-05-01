import compose from 'lodash/fp/compose';
import filter from 'lodash/fp/filter';
import getOr from 'lodash/fp/getOr';
import isEqual from 'lodash/fp/isEqual';
import map from 'lodash/fp/map';
import range from 'lodash/fp/range';
import times from 'lodash/fp/times';
import Tone from '../tone';
import * as helpers from '../helpers';

// createPlaybackSequence ::
// Sequence -> Array Note -> Server -> PlaybackSequence
export const createPlaybackSequence = (sequence, notes, server) => {
  const data = getData(sequence, notes);
  return {
    id: sequence.id,
    measureCount: sequence.measureCount,
    part: getPart(sequence, data, server),
    position: sequence.position,
    trackId: sequence.trackId,
    data,
  };
};

// getData ::
// Sequence -> Array Note -> Array Array NoteData
function getData(sequence, notes) {
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
    sequence.measureCount * 32,
  );
}

// getPart ::
// Sequence -> Array Array NoteData -> Server -> Part
function getPart(sequence, data, server) {
  const part = Tone.createPart((time, step) => {
    const notes = data[step];

    notes.forEach((note) => {
      server.playNote(note.name, note.length, time);
    });
  }, range(0, sequence.measureCount * 32), '32n');

  part.start(0);

  return part;
}
