import * as actions from '../../actions';
import { noteDict as reducer } from '../note-dict';

describe('Song noteDict reducer', () => {
  it('should return the initial state', () => {
    const previous = undefined;
    const expected = {};
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle NOTES_ADDED', () => {
    const previous = {
      n1: {
        id: 'n1',
        points: [{ x: 0, y: 3 }, { x: 2, y: 3 }],
        sequenceId: 's1',
      },
    };
    const expected = {
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
    };
    const action = {
      type: actions.NOTES_ADDED,
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
    };
    const expected = {
      n1: {
        id: 'n1',
        points: [{ x: 0, y: 3 }, { x: 2, y: 3 }],
        sequenceId: 's1',
      },
    };
    const action = {
      type: actions.NOTES_DELETED,
      ids: ['n2'],
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle NOTES_SET', () => {
    const previous = {
      n1: {
        id: 'n1',
        points: [{ x: 0, y: 3 }, { x: 2, y: 3 }],
        sequenceId: 's1',
      },
    };
    const expected = {
      n1: {
        id: 'n1',
        points: [{ x: 0, y: 3 }, { x: 2, y: 3 }],
        sequenceId: 's1',
      },
    };
    const action = {
      type: actions.NOTES_SET,
      notes: [{
        id: 'n1',
        points: [{ x: 0, y: 3 }, { x: 2, y: 3 }],
        sequenceId: 's1',
      }],
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle NOTES_MOVE_COMMITTED', () => {
    const previous = {
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
    };
    const expected = {
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
    };
    const action = {
      type: actions.NOTES_MOVE_COMMITTED,
      notes: [{
        id: 'n2',
        points: [{ x: 0, y: 4 }, { x: 2, y: 4 }],
        sequenceId: 's1',
      }],
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle NOTES_RESIZE_COMMITTED', () => {
    const previous = {
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
    };
    const expected = {
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
    };
    const action = {
      type: actions.NOTES_RESIZE_COMMITTED,
      notes: [{
        id: 'n2',
        points: [{ x: 0, y: 4 }, { x: 2, y: 4 }],
        sequenceId: 's1',
      }],
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle NOTES_UPDATED', () => {
    const previous = {
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
    };
    const expected = {
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
    };
    const action = {
      type: actions.NOTES_UPDATED,
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
    const previous = {};
    const expected = {
      n1: {
        id: 'n1',
        points: [{ x: 0, y: 3 }, { x: 2, y: 3 }],
        sequenceId: 's1',
      },
    };
    const action = {
      type: actions.SONG_LOADED,
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
