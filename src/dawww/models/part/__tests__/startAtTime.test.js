import test from 'ava';
import sinon from 'sinon';
import { startAtTime } from '../startAtTime';

test('should invoke start method on part with startTime', t => {
  const expected = ['(0 * 32n)'];
  const start = sinon.spy();
  startAtTime('(0 * 32n)', { start });
  const result = start.lastCall.args;
  t.deepEqual(result, expected);
});
