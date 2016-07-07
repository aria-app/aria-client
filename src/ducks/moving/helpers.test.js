import * as helpers from './helpers';

describe('Moving Helpers', () => {
  describe('getPointOffset', () => {
    it('returns offset of two 2D coordinates', () => {
      const expected = { x: -2, y: 3 };
      const actual = helpers.getPointOffset(
        { x: 4, y: 6 },
        { x: 2, y: 9 }
      );

      expect(actual).toEqual(expected);
    });
  });
});
