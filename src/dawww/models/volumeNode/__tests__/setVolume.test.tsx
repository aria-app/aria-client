import test from 'ava';
import { setVolume } from '../setVolume';

test('should set volume.value field on volumeNode: value', t => {
  const expected = -5;
  const volumeNode = { volume: { value: -100 } };
  setVolume(volumeNode, -5);
  const result = volumeNode.volume.value;
  t.is(result, expected);
});
