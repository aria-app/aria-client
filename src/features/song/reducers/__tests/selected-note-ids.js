import shortcuts from '../../../shortcuts';
import * as actions from '../../actions';
import { selectedNoteIds as reducer } from '../selected-note-ids';

describe('Song selectedNoteIds reducer', () => {
  it('should return the initial state', () => {
    const previous = undefined;
    const expected = [];
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle ALL_NOTES_DESELECTED', () => {
    const previous = ['id1', 'id2'];
    const expected = [];
    const action = {
      type: actions.ALL_NOTES_DESELECTED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle shortcuts/DESELECT', () => {
    const previous = ['id1', 'id2'];
    const expected = [];
    const action = {
      type: shortcuts.actions.DESELECT,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle NOTES_DELETED', () => {
    const previous = ['id1', 'id2'];
    const expected = [];
    const action = {
      type: actions.NOTES_DELETED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SEQUENCE_CLOSED', () => {
    const previous = ['id1', 'id2'];
    const expected = [];
    const action = {
      type: actions.SEQUENCE_CLOSED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle NOTE_SELECTED', () => {
    const note = { id: '2' };
    const previous = [];
    const expected = [note.id];
    const action = {
      type: actions.NOTE_SELECTED,
      note,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle NOTES_SELECTED', () => {
    const notes = [
      { id: '2' },
      { id: '3' },
    ];
    const previous = [];
    const expected = [notes[0].id, notes[1].id];
    const action = {
      type: actions.NOTES_SELECTED,
      notes,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });
});
