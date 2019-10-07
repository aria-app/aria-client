import test from 'ava';
import { createToneAdapter } from '../index';

test('should set Transport.bpm.value of Tone to value', t => {
  const expected = 150;
  const Tone = {};
  const toneAdapter = createToneAdapter(Tone);
  toneAdapter.setBPM(150);
  const result = Tone.Transport.bpm.value;
  t.is(result, expected);
});
