import * as t from './action-types';
import reducer from './reducer';

describe('Resizing Reducer', () => {
  it('should return the initial state', () => {
    const previous = undefined;
    const expected = {
      isResizing: false,
      newPoint: {},
    };
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle STARTED', () => {
    const previous = {
      isResizing: false,
      newPoint: {},
    };
    const expected = {
      isResizing: true,
      newPoint: {},
    };
    const action = {
      type: t.STARTED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle STOPPED', () => {
    const previous = {
      isResizing: true,
      newPoint: {},
    };
    const expected = {
      isResizing: false,
      newPoint: {},
    };
    const action = {
      type: t.STOPPED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle NEW_POINT_SET', () => {
    const previous = {
      isResizing: false,
      newPoint: {},
    };
    const expected = {
      isResizing: false,
      newPoint: { x: 0, y: 0 },
    };
    const action = {
      type: t.NEW_POINT_SET,
      newPoint: { x: 0, y: 0 },
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });
});
