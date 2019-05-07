import test from 'ava';
import sinon from 'sinon';
import { startTransportPart } from '../startTransportPart';

test('should invoke models.part.startAtOffset with helpers.measuresToTime(selectors.getLoopStartPoint)', t => {
  const expected = ['time:0', { id: 'a' }];
  const startAtOffset = sinon.spy();
  startTransportPart(
    () => ({
      transportPart: { id: 'a' },
    }),
    {},
    {
      helpers: {
        measuresToTime: x => `time:${x}`,
      },
      models: {
        part: {
          startAtOffset,
        },
      },
      selectors: {
        getLoopStartPoint: () => '0',
      },
    },
  );
  const result = startAtOffset.lastCall.args;
  t.deepEqual(result, expected);
});
