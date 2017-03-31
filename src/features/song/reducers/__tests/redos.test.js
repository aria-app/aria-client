import * as actions from '../../actions';
import { redos as reducer } from '../redos';

describe('Song redos reducer', () => {
  it('should return the initial state', () => {
    const previous = undefined;
    const expected = [];
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle REDOS_SET', () => {
    const redos = [[{}]];
    const previous = [];
    const expected = redos;
    const action = {
      type: actions.REDOS_SET,
      redos,
    };
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
});
