import * as actions from '../../actions';
import { sequenceIds as reducer } from '../sequence-ids';

describe('Song sequenceIds reducer', () => {
  it('should return the initial state', () => {
    const previous = undefined;
    const expected = [];
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SEQUENCES_ADDED', () => {
    const previous = ['s1'];
    const expected = ['s1', 's2'];
    const action = {
      type: actions.SEQUENCES_ADDED,
      sequences: [{
        id: 's2',
        measureCount: 1,
        position: 0,
        trackId: 't1',
      }],
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SEQUENCES_DELETED', () => {
    const previous = ['s1', 's2'];
    const expected = ['s1'];
    const action = {
      type: actions.SEQUENCES_DELETED,
      ids: ['s2'],
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SEQUENCES_SET', () => {
    const previous = [];
    const expected = ['s1'];
    const action = {
      type: actions.SEQUENCES_SET,
      sequences: [{
        id: 's1',
        measureCount: 1,
        position: 0,
        trackId: 't1',
      }],
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SONG_LOADED', () => {
    const previous = [];
    const expected = ['s1'];
    const action = {
      type: actions.SONG_LOADED,
      song: {
        sequences: {
          dict: {
            s1: {
              id: 's1',
              measureCount: 1,
              position: 0,
              trackId: 't1',
            },
          },
          ids: ['s1'],
        },
      },
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });
});
