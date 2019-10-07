import test from 'ava';
import sinon from 'sinon';
import { disablePartLooping } from '../disablePartLooping';

test('should invoke models.part.disableLooping with part', t => {
  const expected = [{ id: 'a' }];
  const disableLooping = sinon.spy();
  disablePartLooping(
    () => ({
      parts: {
        a: { id: 'a' },
      },
    }),
    {
      payload: {
        sequence: { id: 'a' },
      },
    },
    {
      models: {
        part: {
          disableLooping,
        },
      },
    },
  );
  const result = disableLooping.lastCall.args;
  t.deepEqual(result, expected);
});
