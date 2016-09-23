import * as actions from './actions';
import reducer from './reducer';

describe('Moving Reducer', () => {
  it('should return the initial state', () => {
    const previous = undefined;
    const expected = {
      isMoving: false,
      newPoint: {},
    };
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle NEW_POINT_SET', () => {
    const previous = {
      isMoving: false,
      newPoint: {},
    };
    const expected = {
      isMoving: false,
      newPoint: { x: 0, y: 0 },
    };
    const action = {
      type: actions.NEW_POINT_SET,
      newPoint: { x: 0, y: 0 },
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle STARTED', () => {
    const previous = {
      isMoving: false,
      newPoint: {},
    };
    const expected = {
      isMoving: true,
      newPoint: {},
    };
    const action = {
      type: actions.STARTED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle STOPPED', () => {
    const previous = {
      isMoving: true,
      newPoint: {},
    };
    const expected = {
      isMoving: false,
      newPoint: {},
    };
    const action = {
      type: actions.STOPPED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });
});
