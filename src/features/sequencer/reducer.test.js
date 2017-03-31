import shared from '../shared';
import * as actions from './actions';
import reducer from './reducer';

describe('Sequencing Reducer', () => {
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

  it('should handle TOOL_TYPE_SET', () => {
    const previous = {
      previousToolType: '',
      toolType: shared.constants.toolTypes.DRAW,
    };
    const expected = {
      previousToolType: shared.constants.toolTypes.DRAW,
      toolType: shared.constants.toolTypes.ERASE,
    };
    const action = {
      type: actions.TOOL_TYPE_SET,
      previousToolType: shared.constants.toolTypes.DRAW,
      toolType: shared.constants.toolTypes.ERASE,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });
});
