import * as actions from './actions';
import reducer from './reducer';

describe('Sequencing Position Reducer', () => {
  it('should return the initial state', () => {
    const previous = undefined;
    const expected = {
      mousePoint: {},
      scrollLeft: 0,
      scrollTop: 0,
    };
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle MOUSE_POINT_SET', () => {
    const previous = {
      mousePoint: {},
      scrollLeft: 0,
      scrollTop: 0,
    };
    const expected = {
      mousePoint: { x: 0, y: 0 },
      scrollLeft: 0,
      scrollTop: 0,
    };
    const action = {
      type: actions.MOUSE_POINT_SET,
      point: { x: 0, y: 0 },
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SCROLL_LEFT_SET', () => {
    const previous = {
      mousePoint: {},
      scrollLeft: 0,
      scrollTop: 0,
    };
    const expected = {
      mousePoint: {},
      scrollLeft: 100,
      scrollTop: 0,
    };
    const action = {
      type: actions.SCROLL_LEFT_SET,
      scrollLeft: 100,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SCROLL_TOP_SET', () => {
    const previous = {
      mousePoint: {},
      scrollLeft: 0,
      scrollTop: 0,
    };
    const expected = {
      mousePoint: {},
      scrollLeft: 0,
      scrollTop: 100,
    };
    const action = {
      type: actions.SCROLL_TOP_SET,
      scrollTop: 100,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });
});
