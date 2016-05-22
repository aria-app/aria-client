import test from 'ava';
import * as helpers from './helpers';

test('getPointOffset returns offset of two 2D coordinates', t => {
  const expected = { x: -2, y: 3 };
  const actual = helpers.getPointOffset(
    { x: 4, y: 6 },
    { x: 2, y: 9 }
  );

  t.deepEqual(actual, expected);
});
