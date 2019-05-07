import test from 'ava';
import sinon from 'sinon';
import { dispose } from '../dispose';

test('should invoke dispose method on instrument', t => {
  const expected = true;
  const instrument = {
    dispose: sinon.spy(),
  };
  dispose(instrument);
  const result = instrument.dispose.calledOnce;
  t.is(result, expected);
});
