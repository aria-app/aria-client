import * as helpers from './helpers';

describe('Shared Helpers', () => {
  describe('getNoteName', () => {
    it('should return correct name, given y position', () => {
      const expected = 'C3';
      const result = helpers.getNoteName(47);

      expect(result).toEqual(expected);
    });
  });

  describe('getPointOffset', () => {
    it('returns offset of two 2D coordinates', () => {
      const expected = { x: -2, y: 3 };
      const actual = helpers.getPointOffset(
        { x: 4, y: 6 },
        { x: 2, y: 9 },
      );

      expect(actual).toEqual(expected);
    });
  });

  describe('setAtIds', () => {
    it('should return object with items set at their ids', () => {
      const expected = {
        foo: { id: 'foo', text: 'an item' },
      };
      const result = helpers.setAtIds([
        { id: 'foo', text: 'an item' },
      ], {});

      expect(expected).toEqual(result);
    });

    it('should overwrite existing ids', () => {
      const expected = {
        foo: { id: 'foo', text: 'an item' },
      };
      const result = helpers.setAtIds([
        { id: 'foo', text: 'an item' },
      ], {
        foo: { id: 'foo', text: 'original item' },
      });

      expect(expected).toEqual(result);
    });

    it('should create starting object if not provided', () => {
      const expected = {
        foo: { id: 'foo', text: 'an item' },
      };
      const result = helpers.setAtIds([
        { id: 'foo', text: 'an item' },
      ]);

      expect(expected).toEqual(result);
    });
  });

  describe('sizeToTime', () => {
    it('should return correctly formatted time', () => {
      const size = 2;
      const expected = '(3 * 32n)';
      expect(helpers.sizeToTime(size)).toEqual(expected);
    });

    it('should throw if size is not number', () => {
      const size = '2';
      expect(() => helpers.sizeToTime(size)).toThrow();
    });
  });
});
