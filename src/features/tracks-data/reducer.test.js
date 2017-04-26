import * as actions from './actions';
import reducer from './reducer';

describe('Tracking Reducer', () => {
  it('should return the initial state', () => {
    const previous = undefined;
    const expected = {
      redos: [],
      selectedSequenceId: '',
      stagedTrackId: '',
      undos: [],
    };
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SEQUENCE_DELETED', () => {
    const previous = {
      redos: [],
      selectedSequenceId: 's1',
      stagedTrackId: '',
      undos: [],
    };
    const expected = {
      redos: [],
      selectedSequenceId: '',
      stagedTrackId: '',
      undos: [],
    };
    const action = {
      type: actions.SEQUENCE_DELETED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SEQUENCE_DESELECTED', () => {
    const previous = {
      redos: [],
      selectedSequenceId: 's1',
      stagedTrackId: '',
      undos: [],
    };
    const expected = {
      redos: [],
      selectedSequenceId: '',
      stagedTrackId: '',
      undos: [],
    };
    const action = {
      type: actions.SEQUENCE_DESELECTED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SEQUENCE_SELECTED', () => {
    const previous = {
      redos: [],
      selectedSequenceId: '',
      stagedTrackId: '',
      undos: [],
    };
    const expected = {
      redos: [],
      selectedSequenceId: 's1',
      stagedTrackId: '',
      undos: [],
    };
    const action = {
      type: actions.SEQUENCE_SELECTED,
      id: 's1',
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SEQUENCE_OPENED', () => {
    const previous = {
      redos: [],
      selectedSequenceId: 's1',
      stagedTrackId: '',
      undos: [],
    };
    const expected = {
      redos: [],
      selectedSequenceId: '',
      stagedTrackId: '',
      undos: [],
    };
    const action = {
      type: actions.SEQUENCE_OPENED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle TRACK_EDITING_FINISHED', () => {
    const previous = {
      redos: [],
      selectedSequenceId: '',
      stagedTrackId: 't1',
      undos: [],
    };
    const expected = {
      redos: [],
      selectedSequenceId: '',
      stagedTrackId: '',
      undos: [],
    };
    const action = {
      type: actions.TRACK_EDITING_FINISHED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle TRACK_EDITING_STARTED', () => {
    const previous = {
      redos: [],
      selectedSequenceId: '',
      stagedTrackId: '',
      undos: [],
    };
    const expected = {
      redos: [],
      selectedSequenceId: '',
      stagedTrackId: 't1',
      undos: [],
    };
    const action = {
      type: actions.TRACK_EDITING_STARTED,
      id: 't1',
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });
});
