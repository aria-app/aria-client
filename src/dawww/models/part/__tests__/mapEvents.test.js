import test from 'ava';
import sinon from 'sinon';
import { mapEvents } from '../mapEvents';

test('should invoke at method of part (part.length) times, passing the index each time, then it should invoke at again (part.length) times, passing the index and the result of iteratee called with the corresponding value returned by the last set of calls', t => {
  const part = {
    at: sinon.spy(i => i),
    length: 3,
  };
  mapEvents((e, i) => `${e}!${i}`, part);
  t.deepEqual(part.at.getCall(3).args, [0, '0!0']);
  t.deepEqual(part.at.getCall(4).args, [1, '1!1']);
  t.deepEqual(part.at.getCall(5).args, [2, '2!2']);
});
