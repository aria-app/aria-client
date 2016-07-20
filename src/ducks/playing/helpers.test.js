import shared from 'ducks/shared';
import * as helpers from './helpers';

describe('Playing Helpers', () => {
  describe('createChannel', () => {
    it('should return channel', () => {
      const track = {
        id: 'my-track',
        synthType: shared.constants.synthTypes.SQUARE,
      };
      expect(helpers.createChannel(track)).toBeDefined();
    });

    it('should throw when track has no id', () => {
      const track = {
        synthType: shared.constants.synthTypes.SQUARE,
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
