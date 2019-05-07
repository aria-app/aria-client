import test from 'ava';
import sinon from 'sinon';
import { createToneAdapter } from '../index';

test('should invoke Tone.Transport.pause method', t => {
  const expected = true;
  const pause = sinon.spy();
  const toneAdapter = createToneAdapter({
    Transport: {
      pause,
    },
  });
  toneAdapter.pause();
  const result = pause.calledOnce;
  t.is(result, expected);
});
