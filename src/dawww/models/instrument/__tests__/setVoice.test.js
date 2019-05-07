import test from 'ava';
import sinon from 'sinon';
import { setVoice } from '../setVoice';

test('should invoke set method on instrument with { oscillator: { type: voice } }', t => {
  const expected = [{ oscillator: { type: 'tuba' } }];
  const set = sinon.spy();
  setVoice({ set }, 'tuba');
  const result = set.lastCall.args;
  t.deepEqual(result, expected);
});
