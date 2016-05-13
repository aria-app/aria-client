import test from 'ava';
import * as helpers from './helpers';

test('isInside returns true for a note between points with positive offset', t => {
  const start = {
    x: 0,
    y: 0,
  };
  const end = {
    x: 10,
    y: 10,
  };
  const target = {
    x: 5,
    y: 5,
  };
  const result = helpers.isInside(start, end, target);

  t.truthy(result);
});

test('isInside returns true for a note between points with negative offset', t => {
  const start = {
    x: 10,
    y: 10,
  };
  const end = {
    x: 0,
    y: 0,
  };
  const target = {
    x: 5,
    y: 5,
  };
  const result = helpers.isInside(start, end, target);

  t.truthy(result);
});

test('isInside returns false for a note outside points with positive offset', t => {
  const start = {
    x: 0,
    y: 0,
  };
  const end = {
    x: 10,
    y: 10,
  };
  const target = {
    x: 11,
    y: 11,
  };
  const result = helpers.isInside(start, end, target);

  t.falsy(result);
});

test('isInside returns false for a note outside points with negative offset', t => {
  const start = {
    x: 10,
    y: 10,
  };
  const end = {
    x: 0,
    y: 0,
  };
  const target = {
    x: 11,
    y: 11,
  };
  const result = helpers.isInside(start, end, target);

  t.falsy(result);
});
