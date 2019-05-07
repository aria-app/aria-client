import test from 'ava';
import { unmute } from '../unmute';

test('should set mute field on volumeNode: false', t => {
  const expected = false;
  const volumeNode = { mute: true };
  unmute(volumeNode);
  const result = volumeNode.mute;
  t.is(result, expected);
});
