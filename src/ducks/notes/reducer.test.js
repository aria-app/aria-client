import * as t from './action-types';
import reducer from './reducer';
import shortcuts from 'ducks/shortcuts';
import song from 'ducks/song';

describe('Notes Reducer', () => {
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
      type: t.ALL_NOTES_DESELECTED,
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
      type: shortcuts.actionTypes.DESELECT,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle song/NOTES_DELETED', () => {
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
      type: song.actionTypes.NOTES_DELETED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle song/SEQUENCE_CLOSED', () => {
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
      type: song.actionTypes.SEQUENCE_CLOSED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle NOTE_SELECTED', () => {
    const note = song.helpers.createNote({
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
      type: t.NOTE_SELECTED,
      note,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle NOTES_SELECTED', () => {
    const notes = [
      song.helpers.createNote({
        sequenceId: '',
        points: [{ x: 0, y: 0 }, { x: 2, y: 0 }],
      }),
      song.helpers.createNote({
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
      type: t.NOTES_SELECTED,
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
      type: t.REDOS_SET,
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
      type: t.UNDOS_SET,
      undos,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });
});
