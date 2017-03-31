import * as actions from '../../actions';
import { trackDict as reducer } from '../track-dict';

describe('Song trackDict reducer', () => {
  it('should return the initial state', () => {
    const previous = undefined;
    const expected = {};
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle TRACK_IS_MUTED_TOGGLED', () => {
    const previous = {
      t1: {
        id: 't1',
        isMuted: false,
        isSoloing: false,
        synthType: 'my-synth',
        volume: 0,
      },
    };
    const expected = {
      t1: {
        id: 't1',
        isMuted: true,
        isSoloing: false,
        synthType: 'my-synth',
        volume: 0,
      },
    };
    const action = {
      type: actions.TRACK_IS_MUTED_TOGGLED,
      id: 't1',
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle TRACK_IS_SOLOING_TOGGLED', () => {
    const previous = {
      t1: {
        id: 't1',
        isMuted: false,
        isSoloing: false,
        synthType: 'my-synth',
        volume: 0,
      },
    };
    const expected = {
      t1: {
        id: 't1',
        isMuted: false,
        isSoloing: true,
        synthType: 'my-synth',
        volume: 0,
      },
    };
    const action = {
      type: actions.TRACK_IS_SOLOING_TOGGLED,
      id: 't1',
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle TRACK_SYNTH_TYPE_SET', () => {
    const previous = {
      t1: {
        id: 't1',
        isMuted: false,
        isSoloing: false,
        synthType: 'my-synth',
        volume: 0,
      },
    };
    const expected = {
      t1: {
        id: 't1',
        isMuted: false,
        isSoloing: false,
        synthType: 'my-other-synth',
        volume: 0,
      },
    };
    const action = {
      type: actions.TRACK_SYNTH_TYPE_SET,
      id: 't1',
      synthType: 'my-other-synth',
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle TRACKS_ADDED', () => {
    const previous = {
      t1: {
        id: 't1',
        isMuted: false,
        isSoloing: false,
        synthType: 'my-synth',
        volume: 0,
      },
    };
    const expected = {
      t1: {
        id: 't1',
        isMuted: false,
        isSoloing: false,
        synthType: 'my-synth',
        volume: 0,
      },
      t2: {
        id: 't2',
        isMuted: false,
        isSoloing: false,
        synthType: 'my-synth',
        volume: 0,
      },
    };
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
    const previous = {
      t1: {
        id: 't1',
        isMuted: false,
        isSoloing: false,
        synthType: 'my-synth',
        volume: 0,
      },
      t2: {
        id: 't2',
        isMuted: false,
        isSoloing: false,
        synthType: 'my-synth',
        volume: 0,
      },
    };
    const expected = {
      t1: {
        id: 't1',
        isMuted: false,
        isSoloing: false,
        synthType: 'my-synth',
        volume: 0,
      },
    };
    const action = {
      type: actions.TRACKS_DELETED,
      ids: ['t2'],
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle TRACKS_SET', () => {
    const previous = {};
    const expected = {
      t1: {
        id: 't1',
        isMuted: false,
        isSoloing: false,
        synthType: 'my-synth',
        volume: 0,
      },
    };
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

  it('should handle TRACKS_UPDATED', () => {
    const previous = {
      t1: {
        id: 't1',
        isMuted: false,
        isSoloing: false,
        synthType: 'my-synth',
        volume: 0,
      },
      t2: {
        id: 't2',
        isMuted: false,
        isSoloing: false,
        synthType: 'my-synth',
        volume: 0,
      },
    };
    const expected = {
      t1: {
        id: 't1',
        isMuted: false,
        isSoloing: false,
        synthType: 'my-synth',
        volume: 0,
      },
      t2: {
        id: 't2',
        isMuted: false,
        isSoloing: false,
        synthType: 'my-synth-2',
        volume: 0,
      },
    };
    const action = {
      type: actions.TRACKS_UPDATED,
      tracks: [{
        id: 't2',
        isMuted: false,
        isSoloing: false,
        synthType: 'my-synth-2',
        volume: 0,
      }],
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SONG_LOADED', () => {
    const previous = {};
    const expected = {
      t1: {
        id: 't1',
        isMuted: false,
        isSoloing: false,
        synthType: 'my-synth',
        volume: 0,
      },
    };
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
