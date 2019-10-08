import test from 'ava';
import { sizeToTime } from '../helpers/sizeToTime';

test('should return (size + 1) * toneAdapter.Time("32n") as Tone time', t => {
  const expected = 16;
  const mockToneAdapter = {
    Time: () => 2,
  };
  const result = sizeToTime(7, mockToneAdapter);
  t.is(result, expected);
});
