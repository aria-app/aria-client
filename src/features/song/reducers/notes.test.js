import * as actionTypes from '../action-types';
import reducer from './notes';

describe('Song Notes Reducer', () => {
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

  it('should handle NOTES_ADDED', () => {
    const previous = {
      dict: {
        n1: {
          id: 'n1',
          points: [{ x: 0, y: 3 }, { x: 2, y: 3 }],
          sequenceId: 's1',
        },
      },
      ids: ['n1'],
    };
    const expected = {
      dict: {
        n1: {
          id: 'n1',
          points: [{ x: 0, y: 3 }, { x: 2, y: 3 }],
          sequenceId: 's1',
        },
        n2: {
          id: 'n2',
          points: [{ x: 0, y: 3 }, { x: 2, y: 3 }],
          sequenceId: 's1',
        },
      },
      ids: ['n1', 'n2'],
    };
    const action = {
      type: actionTypes.NOTES_ADDED,
      notes: [{
        id: 'n2',
        points: [{ x: 0, y: 3 }, { x: 2, y: 3 }],
        sequenceId: 's1',
      }],
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle NOTES_DELETED', () => {
    const previous = {
      dict: {
        n1: {
          id: 'n1',
          points: [{ x: 0, y: 3 }, { x: 2, y: 3 }],
          sequenceId: 's1',
        },
        n2: {
          id: 'n2',
          points: [{ x: 0, y: 3 }, { x: 2, y: 3 }],
          sequenceId: 's1',
        },
      },
      ids: ['n1', 'n2'],
    };
    const expected = {
      dict: {
        n1: {
          id: 'n1',
          points: [{ x: 0, y: 3 }, { x: 2, y: 3 }],
          sequenceId: 's1',
        },
      },
      ids: ['n1'],
    };
    const action = {
      type: actionTypes.NOTES_DELETED,
      ids: ['n2'],
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle NOTES_SET', () => {
    const previous = {
      dict: {
        n1: {
          id: 'n1',
          points: [{ x: 0, y: 3 }, { x: 2, y: 3 }],
          sequenceId: 's1',
        },
      },
      ids: ['n1'],
    };
    const expected = {
      dict: {
        n1: {
          id: 'n1',
          points: [{ x: 0, y: 3 }, { x: 2, y: 3 }],
          sequenceId: 's1',
        },
      },
      ids: ['n1'],
    };
    const action = {
      type: actionTypes.NOTES_SET,
      notes: [{
        id: 'n1',
        points: [{ x: 0, y: 3 }, { x: 2, y: 3 }],
        sequenceId: 's1',
      }],
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle NOTES_UPDATED', () => {
    const previous = {
      dict: {
        n1: {
          id: 'n1',
          points: [{ x: 0, y: 3 }, { x: 2, y: 3 }],
          sequenceId: 's1',
        },
        n2: {
          id: 'n2',
          points: [{ x: 0, y: 3 }, { x: 2, y: 3 }],
          sequenceId: 's1',
        },
      },
      ids: ['n1', 'n2'],
    };
    const expected = {
      dict: {
        n1: {
          id: 'n1',
          points: [{ x: 0, y: 3 }, { x: 2, y: 3 }],
          sequenceId: 's1',
        },
        n2: {
          id: 'n2',
          points: [{ x: 0, y: 4 }, { x: 2, y: 4 }],
          sequenceId: 's1',
        },
      },
      ids: ['n1', 'n2'],
    };
    const action = {
      type: actionTypes.NOTES_UPDATED,
      notes: [{
        id: 'n2',
        points: [{ x: 0, y: 4 }, { x: 2, y: 4 }],
        sequenceId: 's1',
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
        n1: {
          id: 'n1',
          points: [{ x: 0, y: 3 }, { x: 2, y: 3 }],
          sequenceId: 's1',
        },
      },
      ids: ['n1'],
    };
    const action = {
      type: actionTypes.SONG_LOADED,
      song: {
        notes: {
          dict: {
            n1: {
              id: 'n1',
              points: [{ x: 0, y: 3 }, { x: 2, y: 3 }],
              sequenceId: 's1',
            },
          },
          ids: ['n1'],
        },
      },
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });
});
