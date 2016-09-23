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
      heldKeys: ['space'],
    };
    const action = {
      type: actions.HELD_KEYS_SET,
      keys: ['space'],
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });
});
