import * as actions from '../../actions';
import { name as reducer } from '../name';

describe('Song name reducer', () => {
  it('should return the initial state', () => {
    const previous = undefined;
    const expected = '';
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SONG_LOADED', () => {
    const previous = '';
    const expected = 'my-song';
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

  it('should handle NAME_SET', () => {
    const previous = '';
    const expected = 'my-song';
    const action = {
      type: actions.NAME_SET,
      name: 'my-song',
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });
});
