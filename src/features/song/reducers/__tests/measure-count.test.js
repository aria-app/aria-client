import * as actions from '../../actions';
import { measureCount as reducer } from '../measure-count';

describe('Song measureCount reducer', () => {
  it('should return the initial state', () => {
    const previous = undefined;
    const expected = 1;
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SONG_LOADED', () => {
    const previous = 1;
    const expected = 3;
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

  it('should handle MEASURE_COUNT_SET', () => {
    const previous = 1;
    const expected = 3;
    const action = {
      type: actions.MEASURE_COUNT_SET,
      measureCount: 3,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SONG_EXTENDED', () => {
    const previous = 1;
    const expected = 2;
    const action = {
      type: actions.SONG_EXTENDED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SONG_SHORTENED', () => {
    const previous = 2;
    const expected = 1;
    const action = {
      type: actions.SONG_SHORTENED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });
});
