import * as actions from './actions';
import reducer from './reducer';

describe('App Reducer', () => {
  it('should return the initial state', () => {
    const previous = undefined;
    const expected = {
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    };
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle WINDOW_HEIGHT_CHANGED', () => {
    const previous = {
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    };
    const expected = {
      windowHeight: 1024,
      windowWidth: window.innerWidth,
    };
    const action = {
      type: actions.WINDOW_HEIGHT_CHANGED,
      height: 1024,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle WINDOW_WIDTH_CHANGED', () => {
    const previous = {
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    };
    const expected = {
      windowHeight: window.innerHeight,
      windowWidth: 1024,
    };
    const action = {
      type: actions.WINDOW_WIDTH_CHANGED,
      width: 1024,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });
});
