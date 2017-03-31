import shared from '../../../shared';
import * as actions from '../../actions';
import { bpm as reducer } from '../bpm';

describe('Song bpm reducer', () => {
  it('should return the initial state', () => {
    const previous = undefined;
    const expected = 120;
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle BPM_SET', () => {
    const previous = 120;
    const expected = 150;
    const action = {
      type: actions.BPM_SET,
      bpm: 150,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should clamp bpm when set too low', () => {
    const previous = 120;
    const expected = shared.constants.minBPM;
    const action = {
      type: actions.BPM_SET,
      bpm: shared.constants.minBPM - 10,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should clamp bpm when set too high', () => {
    const previous = 120;
    const expected = shared.constants.maxBPM;
    const action = {
      type: actions.BPM_SET,
      bpm: shared.constants.maxBPM + 10,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SONG_LOADED', () => {
    const previous = 120;
    const expected = 170;
    const action = {
      type: actions.SONG_LOADED,
      song: {
        activeSequenceId: 'my-sequence',
        bpm: 170,
        id: 'song-1',
        measureCount: 3,
        name: 'my-song',
      },
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });
});
