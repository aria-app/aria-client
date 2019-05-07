import test from 'ava';
import { createToneAdapter } from '../index';

test('should set Transport.position of Tone to position', t => {
  const expected = 0;
  const Tone = {};
  const toneAdapter = createToneAdapter(Tone);
  toneAdapter.setTransportPosition(0);
  const result = Tone.Transport.position;
  t.is(result, expected);
});
