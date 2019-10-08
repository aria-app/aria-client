import test from 'ava';
import { getLoopEndPoint } from '../getLoopEndPoint';

test('should return sum of song.sequences[song.focusedSequenceId].position and song.sequences[song.focusedSequenceId].measureCount when song.sequences[song.focusedSequenceId] is not empty', t => {
  const expected = 3;
  const result = getLoopEndPoint({
    song: {
      focusedSequenceId: 'b',
      sequences: {
        a: {},
        b: {
          measureCount: 1,
          position: 2,
        },
      },
    },
  });
  t.is(result, expected);
});

test('should return song.measureCount when song.sequences[song.focusedSequenceId] is empty', t => {
  const expected = 4;
  const result = getLoopEndPoint({
    song: {
      focusedSequenceId: 'b',
      measureCount: 4,
      sequences: {
        a: {},
        b: {},
      },
    },
  });
  t.is(result, expected);
});
