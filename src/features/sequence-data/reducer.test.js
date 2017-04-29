import shared from '../shared';
import reducer from './reducer';

describe('Sequence Data Reducer', () => {
  it('should return the initial state', () => {
    const previous = undefined;
    const expected = {
      previousToolType: '',
      toolType: shared.constants.defaultToolType,
    };
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });
});
