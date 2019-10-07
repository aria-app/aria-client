import test from 'ava';
import { getLetterFromPitch } from '../helpers/getLetterFromPitch';

test('should return "B" when pitch % 12 === 0', t => {
  const expected = 'B';
  const result = getLetterFromPitch(36);
  t.is(result, expected);
});

test('should return "A#" when pitch % 12 === 1', t => {
  const expected = 'A#';
  const result = getLetterFromPitch(37);
  t.is(result, expected);
});

test('should return "A" when pitch % 12 === 2', t => {
  const expected = 'A';
  const result = getLetterFromPitch(38);
  t.is(result, expected);
});

test('should return "G#" when pitch % 12 === 3', t => {
  const expected = 'G#';
  const result = getLetterFromPitch(39);
  t.is(result, expected);
});

test('should return "G" when pitch % 12 === 4', t => {
  const expected = 'G';
  const result = getLetterFromPitch(40);
  t.is(result, expected);
});

test('should return "F#" when pitch % 12 === 5', t => {
  const expected = 'F#';
  const result = getLetterFromPitch(41);
  t.is(result, expected);
});

test('should return "F" when pitch % 12 === 6', t => {
  const expected = 'F';
  const result = getLetterFromPitch(42);
  t.is(result, expected);
});

test('should return "E" when pitch % 12 === 7', t => {
  const expected = 'E';
  const result = getLetterFromPitch(43);
  t.is(result, expected);
});

test('should return "D#" when pitch % 12 === 8', t => {
  const expected = 'D#';
  const result = getLetterFromPitch(44);
  t.is(result, expected);
});

test('should return "D" when pitch % 12 === 9', t => {
  const expected = 'D';
  const result = getLetterFromPitch(45);
  t.is(result, expected);
});

test('should return "C#" when pitch % 12 === 10', t => {
  const expected = 'C#';
  const result = getLetterFromPitch(46);
  t.is(result, expected);
});

test('should return "C" when pitch % 12 === 11', t => {
  const expected = 'C';
  const result = getLetterFromPitch(47);
  t.is(result, expected);
});
