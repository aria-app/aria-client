import * as t from './action-types';
import reducer from './reducer';

describe('App Reducer', () => {
  it('should return the initial state', () => {
    const previous = undefined;
    const expected = {
      isBPMModalOpen: false,
    };
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle BPM_MODAL_CLOSED', () => {
    const previous = {
      isBPMModalOpen: true,
    };
    const expected = {
      isBPMModalOpen: false,
    };
    const action = {
      type: t.BPM_MODAL_CLOSED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle BPM_MODAL_OPENED', () => {
    const previous = {
      isBPMModalOpen: false,
    };
    const expected = {
      isBPMModalOpen: true,
    };
    const action = {
      type: t.BPM_MODAL_OPENED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });
});
