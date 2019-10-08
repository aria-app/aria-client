import test from 'ava';
import { getLoopStartPoint } from '../getLoopStartPoint';

test('should return song.sequences[song.focusedSequenceId].position when song.sequences[song.focusedSequenceId] is not empty', t => {
  const expected = 2;
  const result = getLoopStartPoint({
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

test('should return 0 when song.sequences[song.focusedSequenceId] is empty', t => {
  const expected = 0;
  const result = getLoopStartPoint({
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
