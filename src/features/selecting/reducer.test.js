import * as actions from './actions';
import reducer from './reducer';

describe('Selecting Reducer', () => {
  it('should return the initial state', () => {
    const previous = undefined;
    const expected = {
      isSelecting: false,
      newPoint: {},
      startPoint: {},
    };
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle STARTED', () => {
    const previous = {
      isSelecting: false,
      newPoint: {},
      startPoint: {},
    };
    const expected = {
      isSelecting: true,
      newPoint: {},
      startPoint: {},
    };
    const action = {
      type: t.STARTED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle STOPPED', () => {
    const previous = {
      isSelecting: true,
      newPoint: {},
      startPoint: {},
    };
    const expected = {
      isSelecting: false,
      newPoint: {},
      startPoint: {},
    };
    const action = {
      type: t.STOPPED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle NEW_POINT_SET', () => {
    const previous = {
      isSelecting: false,
      newPoint: {},
      startPoint: {},
    };
    const expected = {
      isSelecting: false,
      newPoint: { x: 0, y: 0 },
      startPoint: {},
    };
    const action = {
      type: t.NEW_POINT_SET,
      newPoint: { x: 0, y: 0 },
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle START_POINT_SET', () => {
    const previous = {
      isSelecting: false,
      newPoint: {},
      startPoint: {},
    };
    const expected = {
      isSelecting: false,
      newPoint: {},
      startPoint: { x: 0, y: 0 },
    };
    const action = {
      type: t.START_POINT_SET,
      startPoint: { x: 0, y: 0 },
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });
});
