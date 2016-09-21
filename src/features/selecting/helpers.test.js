import * as helpers from './helpers';

describe('Selecting Helpers', () => {
  describe('isInside', () => {
    it('should return true, given a note between points with positive offset', () => {
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

      expect(result).toEqual(true);
    });

    it('should return true, given a note between points with negative offset', () => {
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

      expect(result).toEqual(true);
    });

    it('should return false, given a note outside points with positive offset', () => {
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

      expect(result).toEqual(false);
    });

    it('should return false, given a note outside points with negative offset', () => {
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

      expect(result).toEqual(false);
    });
  });
});
