import * as actions from '../../actions';
import { id as reducer } from '../id';

describe('Song id reducer', () => {
  it('should return the initial state', () => {
    const previous = undefined;
    const expected = '';
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SONG_LOADED', () => {
    const previous = '';
    const expected = 'song-1';
    const action = {
      type: actions.SONG_LOADED,
      song: {
        activeSequenceId: 'my-sequence',
        bpm: 150,
        id: 'song-1',
        measureCount: 3,
        name: 'my-song',
      },
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle ID_SET', () => {
    const previous = '';
    const expected = 'song-1';
    const action = {
      type: actions.ID_SET,
      id: 'song-1',
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });
});
