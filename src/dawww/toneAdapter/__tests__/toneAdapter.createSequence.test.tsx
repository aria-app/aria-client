import test from 'ava';
import sinon from 'sinon';
import { createToneAdapter } from '../index';

test('should return instance of Tone.Sequence ', t => {
  const expected = true;
  class Sequence {}
  const toneAdapter = createToneAdapter({
    Sequence,
    Time: x => x,
  });
  const returnValue = toneAdapter.createSequence();
  const result = returnValue instanceof Sequence;
  t.is(result, expected);
});

test('should invoke Tone.Sequence constructor with correct onSequenceStep method, range of numbers with length === length, "32n"', t => {
  const onSequenceStep = () => {};
  const expected = [onSequenceStep, [0, 1, 2], '32n'];
  const constructor = sinon.spy();
  class Sequence {
    constructor(...args) {
      constructor(...args);
    }
  }
  const toneAdapter = {
    ...createToneAdapter({ Sequence, Time: x => x }),
    onSequenceStep,
  };
  toneAdapter.createSequence({
    length: 3,
  });
  const result = constructor.lastCall.args;
  t.deepEqual(result, expected);
});
