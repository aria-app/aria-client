import test from 'ava';
import sinon from 'sinon';
import { createToneAdapter } from '../index';

test('should return instance of Tone.Volume ', t => {
  const expected = true;
  class Volume {}
  const toneAdapter = createToneAdapter({
    Volume,
  });
  const returnValue = toneAdapter.createVolume();
  const result = returnValue instanceof Volume;
  t.is(result, expected);
});

test('should invoke Tone.Volume constructor with options.track.volume', t => {
  const expected = [-5];
  const constructor = sinon.spy();
  class Volume {
    constructor(...args) {
      constructor(...args);
    }
  }
  const toneAdapter = createToneAdapter({
    Volume,
  });
  toneAdapter.createVolume({
    track: {
      volume: -5,
    },
  });
  const result = constructor.lastCall.args;
  t.deepEqual(result, expected);
});
