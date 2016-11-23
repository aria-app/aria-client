import * as actions from '../actions';
import reducer from './tracks';

describe('Song Tracks Reducer', () => {
  it('should return the initial state', () => {
    const previous = undefined;
    const expected = {
      dict: {},
      ids: [],
    };
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle TRACK_IS_MUTED_TOGGLED', () => {
    const previous = {
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
    };
    const expected = {
      dict: {
        t1: {
          id: 't1',
          isMuted: true,
          isSoloing: false,
          synthType: 'my-synth',
          volume: 0,
        },
      },
      ids: ['t1'],
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
    };
    const expected = {
      dict: {
        t1: {
          id: 't1',
          isMuted: false,
          isSoloing: true,
          synthType: 'my-synth',
          volume: 0,
        },
      },
      ids: ['t1'],
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
    };
    const expected = {
      dict: {
        t1: {
          id: 't1',
          isMuted: false,
          isSoloing: false,
          synthType: 'my-other-synth',
          volume: 0,
        },
      },
      ids: ['t1'],
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
    };
    const expected = {
      dict: {
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
      },
      ids: ['t1', 't2'],
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
      dict: {
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
      },
      ids: ['t1', 't2'],
    };
    const expected = {
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
    };
    const action = {
      type: actions.TRACKS_DELETED,
      ids: ['t2'],
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle TRACKS_SET', () => {
    const previous = {
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
    };
    const expected = {
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
      dict: {
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
      },
      ids: ['t1', 't2'],
    };
    const expected = {
      dict: {
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
      },
      ids: ['t1', 't2'],
    };
    const action = {
      type: actions.TRACKS_UPDATED,
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

  it('should handle SONG_LOADED', () => {
    const previous = {
      dict: {},
      ids: [],
    };
    const expected = {
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
