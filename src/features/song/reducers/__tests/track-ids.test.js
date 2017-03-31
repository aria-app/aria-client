import * as actions from '../../actions';
import { trackIds as reducer } from '../track-ids';

describe('Song trackIds reducer', () => {
  it('should return the initial state', () => {
    const previous = undefined;
    const expected = [];
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle TRACK_DELETED', () => {
    const previous = ['t1', 't2'];
    const expected = ['t1'];
    const action = {
      type: actions.TRACK_DELETED,
      id: 't2',
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle TRACKS_ADDED', () => {
    const previous = ['t1'];
    const expected = ['t1', 't2'];
    const action = {
      type: actions.TRACKS_ADDED,
      tracks: [{
        id: 't2',
        isMuted: false,
        isSoloing: false,
        synthType: 'my-synth',
        volume: 0,
      }],
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle TRACKS_DELETED', () => {
    const previous = ['t1', 't2'];
    const expected = ['t1'];
    const action = {
      type: actions.TRACKS_DELETED,
      ids: ['t2'],
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle TRACKS_SET', () => {
    const previous = [];
    const expected = ['t1'];
    const action = {
      type: actions.TRACKS_SET,
      tracks: [{
        id: 't1',
        isMuted: false,
        isSoloing: false,
        synthType: 'my-synth',
        volume: 0,
      }],
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SONG_LOADED', () => {
    const previous = [];
    const expected = ['t1'];
    const action = {
      type: actions.SONG_LOADED,
      song: {
        tracks: {
          dict: {
            t1: {
              id: 't1',
              isMuted: false,
              isSoloing: false,
              synthType: 'my-synth',
              volume: 0,
            },
          },
          ids: ['t1'],
        },
      },
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });
});
