import * as helpers from './helpers';

describe('Shared Helpers', () => {
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
});
