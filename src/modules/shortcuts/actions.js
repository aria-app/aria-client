import _ from 'lodash';
import Mousetrap from 'mousetrap';
import notes from 'modules/notes';
import sequence from 'modules/sequence';
import sound from 'modules/sound';
import actionTypes from './actionTypes';
import selectors from './selectors';

export function initialize() {
  return (dispatch) => {
    // Tools
    Mousetrap.bind('d', () => dispatch(activateDrawTool()));
    Mousetrap.bind('e', () => dispatch(activateEraseTool()));
    Mousetrap.bind('m', () => dispatch(activateMoveTool()));
    Mousetrap.bind('p', () => dispatch(activatePanTool()));
    Mousetrap.bind('s', () => dispatch(activateSelectTool()));
    Mousetrap.bind('space', (e) => dispatch(holdPan(e)), 'keydown');
    Mousetrap.bind('space', () => dispatch(revertPan()), 'keyup');

    // Playback
    Mousetrap.bind('enter', () => dispatch(togglePlayPause()));
    Mousetrap.bind('escape', () => dispatch(stop()));
    Mousetrap.bind(['backspace', 'del'], () => dispatch(removeSelectedNotes()));

    // Nudge
    Mousetrap.bind('up', e => dispatch(nudgeSelectedNotes({ x: 0, y: -1 }, e)));
    Mousetrap.bind('down', e => dispatch(nudgeSelectedNotes({ x: 0, y: 1 }, e)));
    Mousetrap.bind('left', e => dispatch(nudgeSelectedNotes({ x: -1, y: 0 }, e)));
    Mousetrap.bind('right', e => dispatch(nudgeSelectedNotes({ x: 1, y: 0 }, e)));

    // Note Actions
    Mousetrap.bind('ctrl+d', e => dispatch(duplicateSelectedNotes(e)));
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

function holdPan(e) {
  return (dispatch, getState) => {
    const heldKeys = selectors.getHeldKeys(getState());
    if (_.includes(heldKeys, e.keyCode)) return;
    const toolType = sequence.constants.toolTypes.PAN;
    const currentToolType = sequence.selectors.getToolType(getState());

    console.log(toolType);

    if (currentToolType === toolType) return;

    dispatch(sequence.actions.setToolType(toolType));
    dispatch(setHeldKeys([e.keyCode]));
  };
}

function revertPan() {
  return (dispatch, getState) => {
    const previousToolType = sequence.selectors.getPreviousToolType(getState());

    if (previousToolType === sequence.constants.toolTypes.PAN) return;

    console.log(previousToolType);

    dispatch(sequence.actions.setToolType(previousToolType));
    dispatch(setHeldKeys([]));
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

function duplicateSelectedNotes(e) {
  e.preventDefault();
  return (dispatch) => {
    dispatch(notes.actions.duplicate());
  };
}

function nudgeSelectedNotes(offset, e) {
  e.preventDefault();
  return (dispatch, getState) => {
    const selectedNotes = notes.selectors.getSelectedNotes(getState());

    if (_.isEmpty(selectedNotes)) return;

    dispatch(notes.actions.move(selectedNotes, offset));
  };
}

function removeSelectedNotes() {
  return (dispatch, getState) => {
    const selectedNotes = notes.selectors.getSelectedNotes(getState());

    if (_.isEmpty(selectedNotes)) return;

    dispatch(notes.actions.remove(selectedNotes));
  };
}

function setHeldKeys(heldKeys) {
  return {
    type: actionTypes.SET_HELD_KEYS,
    heldKeys,
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
