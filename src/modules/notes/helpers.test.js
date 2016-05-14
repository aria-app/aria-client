import test from 'ava';
import * as constants from './constants';
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

test('someNoteWillMoveOutside returns true if any note is at x=0 and offset x=-1', t => {
  const notes = [helpers.createNote({
    position: {
      x: 0,
      y: 35,
    },
  })];
  const offset = {
    x: -1,
    y: 0,
  };
  const measureCount = 1;
  const result = helpers.someNoteWillMoveOutside(notes, offset, measureCount);

  t.truthy(result);
});

test('someNoteWillMoveOutside returns true if any note is at x=(measureCount * 8 * 4) and offset x=1', t => {
  const measureCount = 1;
  const notes = [helpers.createNote({
    position: {
      x: measureCount * 8 * 4,
      y: 35,
    },
  })];
  const offset = {
    x: 1,
    y: 0,
  };
  const result = helpers.someNoteWillMoveOutside(notes, offset, measureCount);

  t.truthy(result);
});

test('someNoteWillMoveOutside returns true if any note is at y=0 and offset y=-1', t => {
  const measureCount = 1;
  const notes = [helpers.createNote({
    position: {
      x: 35,
      y: 0,
    },
  })];
  const offset = {
    x: 0,
    y: -1,
  };
  const result = helpers.someNoteWillMoveOutside(notes, offset, measureCount);

  t.truthy(result);
});

test('someNoteWillMoveOutside returns true if any note is at y=(constants.octaveRange.length * 12 - 1) and offset y=1', t => {
  const measureCount = 1;
  const notes = [helpers.createNote({
    position: {
      x: 35,
      y: constants.octaveRange.length * 12 - 1,
    },
  })];
  const offset = {
    x: 0,
    y: 1,
  };
  const result = helpers.someNoteWillMoveOutside(notes, offset, measureCount);

  t.truthy(result);
});
