import _ from 'lodash';
import Mousetrap from 'mousetrap';
import notes from 'modules/notes';
import sequence from 'modules/sequence';
import sound from 'modules/sound';

export function initialize() {
  return (dispatch) => {
    Mousetrap.bind('d', () => dispatch(activateDrawTool()));
    Mousetrap.bind('e', () => dispatch(activateEraseTool()));
    Mousetrap.bind('m', () => dispatch(activateMoveTool()));
    Mousetrap.bind('p', () => dispatch(activatePanTool()));
    Mousetrap.bind('s', () => dispatch(activateSelectTool()));
    Mousetrap.bind('enter', () => dispatch(togglePlayPause()));
    Mousetrap.bind('escape', () => dispatch(stop()));
    Mousetrap.bind(['backspace', 'del'], () => dispatch(deleteNotes()));
  };
}

function activateDrawTool() {
  return (dispatch, getState) => {
    const toolType = sequence.constants.toolTypes.DRAW;
    const currentToolType = sequence.selectors.getToolType(getState());

    if (currentToolType === toolType) return;

    dispatch(sequence.actions.setToolType(toolType));
  };
}

function activateEraseTool() {
  return (dispatch, getState) => {
    const toolType = sequence.constants.toolTypes.ERASE;
    const currentToolType = sequence.selectors.getToolType(getState());

    if (currentToolType === toolType) return;

    dispatch(sequence.actions.setToolType(toolType));
  };
}

function activateMoveTool() {
  return (dispatch, getState) => {
    const toolType = sequence.constants.toolTypes.MOVE;
    const currentToolType = sequence.selectors.getToolType(getState());

    if (currentToolType === toolType) return;

    dispatch(sequence.actions.setToolType(toolType));
  };
}

function activatePanTool() {
  return (dispatch, getState) => {
    const toolType = sequence.constants.toolTypes.PAN;
    const currentToolType = sequence.selectors.getToolType(getState());

    if (currentToolType === toolType) return;

    dispatch(sequence.actions.setToolType(toolType));
  };
}

function activateSelectTool() {
  return (dispatch, getState) => {
    const toolType = sequence.constants.toolTypes.SELECT;
    const currentToolType = sequence.selectors.getToolType(getState());

    if (currentToolType === toolType) return;

    dispatch(sequence.actions.setToolType(toolType));
  };
}

function deleteNotes() {
  return (dispatch, getState) => {
    const selectedNotes = notes.selectors.getSelectedNotes(getState());

    if (_.isEmpty(selectedNotes)) return;

    dispatch(notes.actions.deleteNotes(selectedNotes));
  };
}

function stop() {
  return (dispatch) => {
    dispatch(sound.actions.stop());
  };
}

function togglePlayPause() {
  return (dispatch) => {
    dispatch(sound.actions.togglePlayPause());
  };
}
