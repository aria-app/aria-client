import * as actions from './actions';
import reducer from './reducer';

describe('Shortcuts Reducer', () => {
  it('should return the initial state', () => {
    const previous = undefined;
    const expected = {
      heldKeys: [],
    };
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle HELD_KEYS_SET', () => {
    const previous = {
      heldKeys: [],
    };
    const expected = {
      heldKeys: [32],
    };
    const action = {
      type: actions.HELD_KEYS_SET,
      keys: [32],
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle KEY_HOLD_STARTED', () => {
    const previous = {
      heldKeys: [],
    };
    const expected = {
      heldKeys: [32],
    };
    const action = {
      type: actions.KEY_HOLD_STARTED,
      keyCode: 32,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle KEY_HOLD_STOPPED', () => {
    const previous = {
      heldKeys: [32],
    };
    const expected = {
      heldKeys: [],
    };
    const action = {
      type: actions.KEY_HOLD_STOPPED,
      keyCode: 32,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });
});
