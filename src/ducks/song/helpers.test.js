import shared from 'ducks/shared';
import * as helpers from './helpers';

describe('Song Helpers', () => {
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
});
