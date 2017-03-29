import shared from '../shared';
import * as helpers from './helpers';

describe('Song Helpers', () => {
  describe('addPoints', () => {
    it('should return add point, given two points', () => {
      const expected = {
        x: 24,
        y: 15,
      };
      const result = helpers.addPoints(
        { x: 16, y: 7 },
        { x: 8, y: 8 },
      );
      expect(result).toEqual(expected);
    });
  });

  describe('createNote', () => {
    it('should return correctly formatted note', () => {
      const expected = {
        id: 'n1',
        points: [
          { x: 0, y: 0 },
          { x: 0, y: 0 },
        ],
        sequenceId: 's1',
      };
      const result = helpers.createNote({
        id: 'n1',
        points: [{ x: 0, y: 0 }, { x: 0, y: 0 }],
        sequenceId: 's1',
      });
      expect(result).toEqual(expected);
    });

    it('should throw if points are undefined', () => {
      const fn = () => helpers.createNote({
        id: 'n1',
        sequenceId: 's1',
      });
      expect(fn).toThrow();
    });

    it('should throw if sequenceId is undefined', () => {
      const fn = () => helpers.createNote({
        id: 'n1',
        points: [{ x: 0, y: 0 }, { x: 0, y: 0 }],
      });
      expect(fn).toThrow();
    });
  });

  describe('createSequence', () => {
    it('should return correctly formatted sequence', () => {
      const expected = {
        id: 's1',
        measureCount: 1,
        position: 1,
        trackId: 't1',
      };
      const result = helpers.createSequence({
        id: 's1',
        measureCount: 1,
        position: 1,
        trackId: 't1',
      });
      expect(expected).toEqual(result);
    });

    it('should throw if measureCount is undefined', () => {
      const fn = () => helpers.createSequence({
        id: 's1',
        position: 1,
        trackId: 't1',
      });
      expect(fn).toThrow();
    });

    it('should throw if position is undefined', () => {
      const fn = () => helpers.createSequence({
        id: 's1',
        measureCount: 1,
        trackId: 't1',
      });
      expect(fn).toThrow();
    });

    it('should throw if trackId is undefined', () => {
      const fn = () => helpers.createSequence({
        id: 's1',
        measureCount: 1,
        position: 1,
      });
      expect(fn).toThrow();
    });
  });

  describe('createTrack', () => {
    it('should return correctly formatted track', () => {
      const expected = {
        id: 't1',
        isMuted: false,
        isSoloing: false,
        synthType: shared.constants.defaultSynthType,
        volume: 0,
      };
      const result = helpers.createTrack({
        id: 't1',
        isMuted: false,
        isSoloing: false,
        synthType: shared.constants.defaultSynthType,
        volume: 0,
      });
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
        x: ((measureCount * 8) * 4) + 1,
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
