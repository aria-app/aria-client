import test from 'ava';
import sinon from 'sinon';
import { disableTransportPartLooping } from '../disableTransportPartLooping';

test('should invoke models.part.disableLooping with getState().transportPart', t => {
  const expected = [{ id: 'a' }];
  const disableLooping = sinon.spy();
  disableTransportPartLooping(
    () => ({
      transportPart: { id: 'a' },
    }),
    {},
    {
      models: {
        part: {
          disableLooping,
        },
      },
      selectors: {
        getLoopStartPoint: () => '0',
      },
    },
  );
  const result = disableLooping.lastCall.args;
  t.deepEqual(result, expected);
});
