import * as selectors from './selectors';

const state = {
  song: {
    activeSequenceId: 's1',
  },
};

describe('Song Selectors', () => {
  describe('getActiveSequenceId', () => {
    it('should return active sequence id', () => {
      const expected = state.song.activeSequenceId;
      const result = selectors.getActiveSequenceId(state);
      expect(result).toEqual(expected);
    });
  });
});
