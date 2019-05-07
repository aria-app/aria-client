import test from 'ava';
import sinon from 'sinon';
import { setToneLoopPoints } from '../setToneLoopPoints';

test('should invoke toneAdapter.setLoopPoints with helpers.measuresToTime(selectors.getLoopStartPoint) and helpers.measuresToTime(selectors.getLoopEndPoint)', t => {
  const expected = ['time:0', 'time:1'];
  const setLoopPoints = sinon.spy();
  setToneLoopPoints(
    () => ({
      transportPart: { id: 'a' },
    }),
    {},
    {
      helpers: {
        measuresToTime: x => `time:${x}`,
      },
      selectors: {
        getLoopEndPoint: () => '1',
        getLoopStartPoint: () => '0',
      },
      toneAdapter: {
        setLoopPoints,
      },
    },
  );
  const result = setLoopPoints.lastCall.args;
  t.deepEqual(result, expected);
});
