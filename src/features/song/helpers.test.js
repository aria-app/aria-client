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

  describe('getIsInside', () => {
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
      const result = helpers.getIsInside(start, end, target);

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
      const result = helpers.getIsInside(start, end, target);

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
      const result = helpers.getIsInside(start, end, target);

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
      const result = helpers.getIsInside(start, end, target);

      expect(result).toEqual(false);
    });
  });
});
