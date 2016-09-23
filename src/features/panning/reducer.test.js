import * as actions from './actions';
import reducer from './reducer';

describe('Panning Reducer', () => {
  it('should return the initial state', () => {
    const previous = undefined;
    const expected = {
      isPanning: false,
      startPoint: {},
    };
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle STARTED', () => {
    const previous = {
      isPanning: false,
      startPoint: {},
    };
    const expected = {
      isPanning: true,
      startPoint: {},
    };
    const action = {
      type: actions.STARTED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle STOPPED', () => {
    const previous = {
      isPanning: true,
      startPoint: {},
    };
    const expected = {
      isPanning: false,
      startPoint: {},
    };
    const action = {
      type: actions.STOPPED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle START_POINT_SET', () => {
    const previous = {
      isPanning: false,
      startPoint: {},
    };
    const expected = {
      isPanning: false,
      startPoint: { x: 0, y: 0 },
    };
    const action = {
      type: actions.START_POINT_SET,
      startPoint: { x: 0, y: 0 },
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });
});
