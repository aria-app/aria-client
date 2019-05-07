import test from 'ava';
import { getNoteLength } from '../helpers/getNoteLength';

test('should return last(note.points).x - (first(note.points).x + 1) as Tone time', t => {
  const expected = 14;
  const result = getNoteLength(
    {
      points: [{ x: 1 }, { x: 4 }, { x: 7 }],
    },
    {
      Time: () => 2,
    },
  );
  t.is(result, expected);
});
