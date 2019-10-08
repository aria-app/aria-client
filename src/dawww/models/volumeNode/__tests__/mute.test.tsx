import test from 'ava';
import { mute } from '../mute';

test('should set mute field on volumeNode: true', t => {
  const expected = true;
  const volumeNode = { mute: false };
  mute(volumeNode);
  const result = volumeNode.mute;
  t.is(result, expected);
});
