import * as actions from './actions';
import reducer from './reducer';

describe('App Reducer', () => {
  it('should return the initial state', () => {
    const previous = undefined;
    const expected = {
      isBPMModalOpen: false,
      isFileOver: false,
    };
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle BPM_MODAL_CLOSED', () => {
    const previous = {
      isBPMModalOpen: true,
      isFileOver: false,
    };
    const expected = {
      isBPMModalOpen: false,
      isFileOver: false,
    };
    const action = {
      type: actions.BPM_MODAL_CLOSED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle BPM_MODAL_OPENED', () => {
    const previous = {
      isBPMModalOpen: false,
      isFileOver: false,
    };
    const expected = {
      isBPMModalOpen: true,
      isFileOver: false,
    };
    const action = {
      type: actions.BPM_MODAL_OPENED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle FILE_DRAG_STARTED', () => {
    const previous = {
      isBPMModalOpen: false,
      isFileOver: false,
    };
    const expected = {
      isBPMModalOpen: false,
      isFileOver: true,
    };
    const action = {
      type: actions.FILE_DRAG_STARTED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle FILE_DRAG_CANCELLED', () => {
    const previous = {
      isBPMModalOpen: false,
      isFileOver: true,
    };
    const expected = {
      isBPMModalOpen: false,
      isFileOver: false,
    };
    const action = {
      type: actions.FILE_DRAG_CANCELLED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle FILE_DROPPED', () => {
    const previous = {
      isBPMModalOpen: false,
      isFileOver: true,
    };
    const expected = {
      isBPMModalOpen: false,
      isFileOver: false,
    };
    const action = {
      type: actions.FILE_DROPPED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });
});
