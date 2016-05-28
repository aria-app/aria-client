import test from 'ava';
import * as helpers from './helpers';

test('createNote returns properly formatted note', t => {
  const expected = {
    id: 1,
    points: [
      {
        x: 2,
        y: 35,
      },
      {
        x: 3,
        y: 35,
      },
    ],
  };
  const result = helpers.createNote({
    id: 1,
    points: [
      {
        x: 2,
        y: 35,
      },
      {
        x: 3,
        y: 35,
      },
    ],
  });

  t.deepEqual(result, expected);
});
