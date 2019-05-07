import test from 'ava';
import sinon from 'sinon';
import { startPart } from '../startPart';

test('should invoke models.part.startAtTime with helpers.measuresToTime(sequence.position), part', t => {
  const expected = ['1!', { id: 'a' }];
  const startAtTime = sinon.spy();
  startPart(
    () => ({
      parts: {
        a: { id: 'a' },
      },
    }),
    {
      payload: {
        sequence: {
          id: 'a',
          position: 1,
        },
      },
    },
    {
      helpers: {
        measuresToTime: x => `${x}!`,
      },
      models: {
        part: {
          startAtTime,
        },
      },
    },
  );
  const result = startAtTime.lastCall.args;
  t.deepEqual(result, expected);
});
