import test from 'ava';
import * as helpers from './helpers';

test('getPositionOffset returns offset of two 2D coordinates', t => {
  const expected = { x: -2, y: 3 };
  const actual = helpers.getPositionOffset(
    { x: 4, y: 6 },
    { x: 2, y: 9 }
  );

  t.deepEqual(actual, expected);
});
