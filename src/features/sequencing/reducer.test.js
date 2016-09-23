import shared from '../shared';
import * as actions from './actions';
import reducer from './reducer';

describe('Sequencing Reducer', () => {
  it('should return the initial state', () => {
    const previous = undefined;
    const expected = {
      mousePoint: {},
      previousToolType: '',
      scrollLeft: 0,
      scrollTop: 0,
      toolType: shared.constants.defaultToolType,
    };
    const action = {};
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle MOUSE_POINT_SET', () => {
    const previous = {
      mousePoint: {},
      previousToolType: '',
      scrollLeft: 0,
      scrollTop: 0,
      toolType: shared.constants.defaultToolType,
    };
    const expected = {
      mousePoint: { x: 0, y: 0 },
      previousToolType: '',
      scrollLeft: 0,
      scrollTop: 0,
      toolType: shared.constants.defaultToolType,
    };
    const action = {
      type: actions.MOUSE_POINT_SET,
      point: { x: 0, y: 0 },
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });

  it('should handle TOOL_TYPE_SET', () => {
    const previous = {
      mousePoint: {},
      previousToolType: '',
      scrollLeft: 0,
      scrollTop: 0,
      toolType: shared.constants.toolTypes.DRAW,
    };
    const expected = {
      mousePoint: {},
      previousToolType: shared.constants.toolTypes.DRAW,
      scrollLeft: 0,
      scrollTop: 0,
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

  it('should handle SCROLL_LEFT_SET', () => {
    const previous = {
      mousePoint: {},
      previousToolType: '',
      scrollLeft: 0,
      scrollTop: 0,
      toolType: shared.constants.defaultToolType,
    };
    const expected = {
      mousePoint: {},
      previousToolType: '',
      scrollLeft: 100,
      scrollTop: 0,
      toolType: shared.constants.defaultToolType,
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
      previousToolType: '',
      scrollLeft: 0,
      scrollTop: 0,
      toolType: shared.constants.defaultToolType,
    };
    const expected = {
      mousePoint: {},
      previousToolType: '',
      scrollLeft: 0,
      scrollTop: 100,
      toolType: shared.constants.defaultToolType,
    };
    const action = {
      type: actions.SCROLL_TOP_SET,
      scrollTop: 100,
    };
    const next = reducer(previous, action);
    expect(next).toEqual(expected);
  });
});
