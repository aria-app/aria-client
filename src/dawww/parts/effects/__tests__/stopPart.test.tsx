import test from 'ava';
import sinon from 'sinon';
import { stopPart } from '../stopPart';

test('should invoke models.part.stop with part', t => {
  const expected = [{ id: 'a' }];
  const stop = sinon.spy();
  stopPart(
    () => ({
      parts: {
        a: { id: 'a' },
      },
    }),
    {
      payload: {
        sequence: {
          id: 'a',
        },
      },
    },
    {
      models: {
        part: {
          stop,
        },
      },
    },
  );
  const result = stop.lastCall.args;
  t.deepEqual(result, expected);
});
