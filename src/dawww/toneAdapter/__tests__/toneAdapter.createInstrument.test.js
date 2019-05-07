import test from 'ava';
import sinon from 'sinon';
import { createToneAdapter } from '../index';

test('should return instance of Tone.PolySynth', t => {
  const expected = true;
  class PolySynth {}
  const toneAdapter = createToneAdapter({
    PolySynth,
  });
  const returnValue = toneAdapter.createInstrument();
  const result = returnValue instanceof PolySynth;
  t.is(result, expected);
});

test('should invoke Tone.PolySynth constructor with 5', t => {
  const expected = [5];
  const constructor = sinon.spy();
  class PolySynth {
    constructor(...args) {
      constructor(...args);
    }
  }
  const toneAdapter = createToneAdapter({
    PolySynth,
  });
  toneAdapter.createInstrument();
  const result = constructor.lastCall.args;
  t.deepEqual(result, expected);
});

test('should invoke set method of Tone.PolySynth with { oscillator: { type: options.track.voice } }', t => {
  const expected = [
    {
      oscillator: {
        type: 'foo',
      },
    },
  ];
  const set = sinon.spy();
  class PolySynth {
    set = set;
  }
  const toneAdapter = createToneAdapter({
    PolySynth,
  });
  toneAdapter.createInstrument({
    track: {
      voice: 'foo',
    },
  });
  const result = set.lastCall.args;
  t.deepEqual(result, expected);
});
