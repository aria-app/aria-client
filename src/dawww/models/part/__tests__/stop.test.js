import test from 'ava';
import sinon from 'sinon';
import { stop } from '../stop';

test('should invoke stop method on part with 0', t => {
  const expected = [0];
  const part = {
    stop: sinon.spy(),
  };
  stop(part);
  const result = part.stop.lastCall.args;
  t.deepEqual(result, expected);
});
