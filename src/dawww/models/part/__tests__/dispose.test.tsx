import test from 'ava';
import sinon from 'sinon';
import { dispose } from '../dispose';

test('should invoke dispose method on part', t => {
  const expected = true;
  const part = {
    dispose: sinon.spy(),
  };
  dispose(part);
  const result = part.dispose.calledOnce;
  t.is(result, expected);
});
