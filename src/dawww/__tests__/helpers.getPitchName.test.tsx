import test from 'ava';
import { getPitchName } from '../helpers/getPitchName';

test('should return pitch translated into note name', t => {
  const expected = 'C3';
  const result = getPitchName(47);
  t.is(result, expected);
});
