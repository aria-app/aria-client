import * as helpers from './helpers';

describe('Transport Helpers', () => {
  describe('measuresToTime', () => {
    it('should return correctly formatted time', () => {
      const expected = '(128 * 32n)';
      const result = helpers.measuresToTime(4);
      expect(result).toEqual(expected);
    });
  });
});
