import test from 'ava';
import sinon from 'sinon';
import { createToneAdapter } from '../index';

test('should invoke chain on source with rest of args, and then Tone.Master', t => {
  const expected = ['a', 'b', 'c'];
  const chain = sinon.spy();
  const toneAdapter = createToneAdapter({
    Master: 'c',
  });
  toneAdapter.chainToMaster({ chain }, 'a', 'b');
  const result = chain.lastCall.args;
  t.deepEqual(result, expected);
});
