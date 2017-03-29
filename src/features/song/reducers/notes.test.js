import shortcuts from '../../shortcuts';
import * as actions from '../actions';
import * as helpers from '../helpers';
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
      type: actions.NOTES_DELETED,
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

  it('should return the initial state', () => {
    const previous = undefined;
    const expected = {
      redos: [],
      selectedIds: [],
      undos: [],
    };
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle ALL_NOTES_DESELECTED', () => {
    const previous = {
      redos: [],
      selectedIds: ['id1', 'id2'],
      undos: [],
    };
    const expected = {
      redos: [],
      selectedIds: [],
      undos: [],
    };
    const action = {
      type: actions.ALL_NOTES_DESELECTED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle shortcuts/DESELECT', () => {
    const previous = {
      redos: [],
      selectedIds: ['id1', 'id2'],
      undos: [],
    };
    const expected = {
      redos: [],
      selectedIds: [],
      undos: [],
    };
    const action = {
      type: shortcuts.actions.DESELECT,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle NOTES_DELETED', () => {
    const previous = {
      redos: [],
      selectedIds: ['id1', 'id2'],
      undos: [],
    };
    const expected = {
      redos: [],
      selectedIds: [],
      undos: [],
    };
    const action = {
      type: actions.NOTES_DELETED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SEQUENCE_CLOSED', () => {
    const previous = {
      redos: [],
      selectedIds: ['id1', 'id2'],
      undos: [[{}]],
    };
    const expected = {
      redos: [],
      selectedIds: [],
      undos: [],
    };
    const action = {
      type: actions.SEQUENCE_CLOSED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle NOTE_SELECTED', () => {
    const note = helpers.createNote({
      sequenceId: '',
      points: [{ x: 0, y: 0 }, { x: 2, y: 0 }],
    });
    const previous = {
      redos: [],
      selectedIds: [],
      undos: [],
    };
    const expected = {
      redos: [],
      selectedIds: [note.id],
      undos: [],
    };
    const action = {
      type: actions.NOTE_SELECTED,
      note,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle NOTES_SELECTED', () => {
    const notes = [
      helpers.createNote({
        sequenceId: '',
        points: [{ x: 0, y: 0 }, { x: 2, y: 0 }],
      }),
      helpers.createNote({
        sequenceId: '',
        points: [{ x: 0, y: 2 }, { x: 2, y: 2 }],
      }),
    ];
    const previous = {
      redos: [],
      selectedIds: [],
      undos: [],
    };
    const expected = {
      redos: [],
      selectedIds: [notes[0].id, notes[1].id],
      undos: [],
    };
    const action = {
      type: actions.NOTES_SELECTED,
      notes,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle REDOS_SET', () => {
    const redos = [[{}]];
    const previous = {
      redos: [],
      selectedIds: [],
      undos: [],
    };
    const expected = {
      selectedIds: [],
      undos: [],
      redos,
    };
    const action = {
      type: actions.REDOS_SET,
      redos,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle UNDOS_SET', () => {
    const undos = [[{}]];
    const previous = {
      redos: [],
      selectedIds: [],
      undos: [],
    };
    const expected = {
      selectedIds: [],
      redos: [],
      undos,
    };
    const action = {
      type: actions.UNDOS_SET,
      undos,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });
});
