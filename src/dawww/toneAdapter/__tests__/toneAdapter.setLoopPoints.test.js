import test from 'ava';
import sinon from 'sinon';
import { createToneAdapter } from '../index';

test('should invoke Tone.Transport.setLoopPoints method with args', t => {
  const expected = ['a', 'b', 'c'];
  const setLoopPoints = sinon.spy();
  const toneAdapter = createToneAdapter({
    Transport: {
      setLoopPoints,
    },
  });
  toneAdapter.setLoopPoints('a', 'b', 'c');
  const result = setLoopPoints.lastCall.args;
  t.deepEqual(result, expected);
});

test('should set Tone.Transport.loop to "true"', t => {
  const expected = true;
  const Tone = {};
  const toneAdapter = createToneAdapter(Tone);
  toneAdapter.setLoopPoints();
  const result = Tone.Transport.loop;
  t.is(result, expected);
});
