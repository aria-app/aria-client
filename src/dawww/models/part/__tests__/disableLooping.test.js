import test from 'ava';
import { disableLooping } from '../disableLooping';

test('should set loop field on part: false', t => {
  const expected = false;
  const part = { loop: true };
  disableLooping(part);
  const result = part.loop;
  t.is(result, expected);
});
