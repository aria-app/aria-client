import test from 'ava';
import sinon from 'sinon';
import { playNote } from '../playNote';

test('should invoke triggerAttackRelease method on instrument with name, length, time', t => {
  const expected = ['C3', '(8 * 32n)', '(0 * 32n)'];
  const triggerAttackRelease = sinon.spy();
  playNote({ triggerAttackRelease }, 'C3', '(8 * 32n)', '(0 * 32n)');
  const result = triggerAttackRelease.lastCall.args;
  t.deepEqual(result, expected);
});

test('should use "16n" as value for length when length is not defined', t => {
  const expected = ['C3', '16n', undefined];
  const triggerAttackRelease = sinon.spy();
  playNote({ triggerAttackRelease }, 'C3');
  const result = triggerAttackRelease.lastCall.args;
  t.deepEqual(result, expected);
});
