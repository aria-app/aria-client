import * as helpers from './helpers';

describe('Playing Helpers', () => {
  describe('createChannel', () => {
    it('should return channel', () => {
      const track = {
        id: 'my-track',
        synthType: 'square',
      };
      expect(helpers.createChannel(track)).toBeDefined();
    });

    it('should throw when track has no id', () => {
      const track = {
        synthType: 'square',
      };
      expect(() => helpers.createChannel(track)).toThrow();
    });

    it('should throw when track has no synthType', () => {
      const track = {
        id: 'my-track',
      };
      expect(() => helpers.createChannel(track)).toThrow();
    });
  });

  describe('getNoteName', () => {
    it('should return correct name, given y position', () => {
      const expected = 'C3';
      const result = helpers.getNoteName(47);

      expect(result).toEqual(expected);
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
