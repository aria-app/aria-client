import shared from '../shared';
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
});
