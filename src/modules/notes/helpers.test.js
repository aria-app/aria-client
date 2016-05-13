import test from 'ava';
import * as helpers from './helpers';

test('addPositions returns position with x values added and y values added', t => {
  const expected = {
    x: 24,
    y: 15,
  };
  const result = helpers.addPositions(
    { x: 16, y: 7 },
    { x: 8, y: 8 }
  );

  t.deepEqual(result, expected);
});

test('createNote returns properly formatted note', t => {
  const expected = {
    id: 1,
    name: 'C4',
    length: 2,
    position: {
      x: 2,
      y: 35,
    },
  };
  const result = helpers.createNote({
    id: 1,
    position: {
      x: 2,
      y: 35,
    },
  });

  t.deepEqual(result, expected);
});

test('getNoteName return correct note name when given Y position', t => {
  const expected = 'C3';
  const result = helpers.getNoteName(47);

  t.deepEqual(result, expected);
});
