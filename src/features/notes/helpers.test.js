import shared from '../shared';
import * as helpers from './helpers';

describe('Notes Helpers', () => {
  describe('addPoints', () => {
    it('should return add point, given two points', () => {
      const expected = {
        x: 24,
        y: 15,
      };
      const result = helpers.addPoints(
        { x: 16, y: 7 },
        { x: 8, y: 8 }
      );
      expect(result).toEqual(expected);
    });
  });

  describe('somePointOutside', () => {
    it('should return true, given point off left of grid', () => {
      const measureCount = 1;
      const points = [{
        x: -1,
        y: 35,
      }];
      const result = helpers.somePointOutside(points, measureCount);

      expect(result).toEqual(true);
    });

    it('should return true, given point off right of grid', () => {
      const measureCount = 1;
      const points = [{
        x: measureCount * 8 * 4 + 1,
        y: 35,
      }];
      const result = helpers.somePointOutside(points, measureCount);

      expect(result).toEqual(true);
    });

    it('should return true, given point off top of grid', () => {
      const measureCount = 1;
      const points = [{
        x: 35,
        y: -1,
      }];
      const result = helpers.somePointOutside(points, measureCount);

      expect(result).toEqual(true);
    });

    it('should return true, given point off bottom of grid', () => {
      const measureCount = 1;
      const points = [{
        x: 35,
        y: shared.constants.octaveRange.length * 12,
      }];
      const result = helpers.somePointOutside(points, measureCount);

      expect(result).toEqual(true);
    });
  });
});
