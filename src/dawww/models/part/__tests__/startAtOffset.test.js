import test from 'ava';
import sinon from 'sinon';
import { startAtOffset } from '../startAtOffset';

test('should invoke start method on part with undefined and offsetTime', t => {
  const expected = [undefined, '(0 * 32n)'];
  const start = sinon.spy();
  startAtOffset('(0 * 32n)', { start });
  const result = start.lastCall.args;
  t.deepEqual(result, expected);
});
