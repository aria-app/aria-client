import test from 'ava';
import { measuresToTime } from '../helpers/measuresToTime';

test('should return measureCount * 32 * toneAdapter.Time("32n")', t => {
  const expected = 64;
  const mockToneAdapter = {
    Time: () => 2,
  };
  const result = measuresToTime(1, mockToneAdapter);
  t.is(result, expected);
});
