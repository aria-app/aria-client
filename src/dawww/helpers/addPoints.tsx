import curry from 'lodash/fp/curry';

export const addPoints = curry((b, a) => ({
  x: a.x + b.x,
  y: a.y + b.y,
}));
