import test from 'ava';
import sinon from 'sinon';
import { dispose } from '../dispose';

test('should invoke dispose method on volumeNode', t => {
  const expected = true;
  const volumeNode = {
    dispose: sinon.spy(),
  };
  dispose(volumeNode);
  const result = volumeNode.dispose.calledOnce;
  t.is(result, expected);
});
