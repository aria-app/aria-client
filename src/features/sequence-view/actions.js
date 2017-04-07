import { NAME } from './constants';

export const KEY_PRESSED = `${NAME}/KEY_PRESSED`;
export const TOOL_SELECTED = `${NAME}/TOOL_SELECTED`;
export const TOOL_TYPE_SET = `${NAME}/TOOL_TYPE_SET`;

export const keyPressed = key => ({
  type: KEY_PRESSED,
  payload: key,
});

export const toolSelected = toolType => ({
  type: TOOL_SELECTED,
  toolType,
});

export const toolTypeSet = (toolType, previousToolType) => ({
  type: TOOL_TYPE_SET,
  previousToolType,
  toolType,
});
