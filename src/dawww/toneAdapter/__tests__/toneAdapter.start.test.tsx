import test from 'ava';
import sinon from 'sinon';
import { createToneAdapter } from '../index';

test('should invoke Tone.Transport.start method with args', t => {
  const expected = [2];
  const start = sinon.spy();
  const toneAdapter = createToneAdapter({
    Transport: {
      start,
    },
  });
  toneAdapter.start(2);
  const result = start.lastCall.args;
  t.deepEqual(result, expected);
});
