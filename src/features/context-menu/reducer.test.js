import * as actions from './actions';
import reducer from './reducer';

const initialState = {
  contextMenuItems: [],
  contextMenuPosition: {},
};

describe('Context Menu Reducer', () => {
  it('should return the initial state', () => {
    const expected = initialState;
    const result = reducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should handle CONTEXT_MENU_OPENED', () => {
    const expected = {
      contextMenuItems: [{ text: 'Item Text' }],
      contextMenuPosition: { x: 100, y: 100 },
    };
    const result = reducer(initialState, {
      type: actions.CONTEXT_MENU_OPENED,
      items: [
        { text: 'Item Text' },
      ],
      position: { x: 100, y: 100 },
    });
    expect(result).toEqual(expected);
  });

  it('should handle CONTEXT_MENU_CLOSED', () => {
    const previousState = {
      contextMenuItems: [{ text: 'Item Text' }],
      contextMenuPosition: { x: 100, y: 100 },
    };
    const expected = {
      contextMenuItems: [],
      contextMenuPosition: {},
    };
    const result = reducer(previousState, {
      type: actions.CONTEXT_MENU_CLOSED,
    });
    expect(result).toEqual(expected);
  });

  it('should handle CONTEXT_MENU_ITEM_SELECTED', () => {
    const previousState = {
      contextMenuItems: [{ text: 'Item Text' }],
      contextMenuPosition: { x: 100, y: 100 },
    };
    const expected = {
      contextMenuItems: [],
      contextMenuPosition: {},
    };
    const result = reducer(previousState, {
      type: actions.CONTEXT_MENU_ITEM_SELECTED,
    });
    expect(result).toEqual(expected);
  });
});
