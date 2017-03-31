import * as actions from '../../actions';
import { undos as reducer } from '../undos';

describe('Song undos reducer', () => {
  it('should return the initial state', () => {
    const previous = undefined;
    const expected = [];
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle SEQUENCE_CLOSED', () => {
    const previous = [[{}]];
    const expected = [];
    const action = {
      type: actions.SEQUENCE_CLOSED,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle UNDOS_SET', () => {
    const undos = [[{}]];
    const previous = [];
    const expected = undos;
    const action = {
      type: actions.UNDOS_SET,
      undos,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });
});
