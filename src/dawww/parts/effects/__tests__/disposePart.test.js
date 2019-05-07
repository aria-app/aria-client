import test from 'ava';
import sinon from 'sinon';
import { disposePart } from '../disposePart';

test('should invoke models.part.dispose with part', t => {
  const expected = [{ id: 'a' }];
  const dispose = sinon.spy();
  disposePart(
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
          dispose,
        },
      },
    },
  );
  const result = dispose.lastCall.args;
  t.deepEqual(result, expected);
});
