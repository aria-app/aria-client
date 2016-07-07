import * as helpers from './helpers';

describe('Shared Helpers', () => {
  describe('getNoteName', () => {
    it('should return correct name, given y position', () => {
      const expected = 'C3';
      const result = helpers.getNoteName(47);

      expect(result).toEqual(expected);
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
