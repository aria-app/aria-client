import _ from 'lodash';
import Mousetrap from 'mousetrap';
import notes from 'modules/notes';
import sequence from 'modules/sequence';
import sound from 'modules/sound';

export function initialize() {
  return (dispatch) => {
    // Tools
    Mousetrap.bind('d', () => dispatch(activateDraw()));
    Mousetrap.bind('e', () => dispatch(activateErase()));
    Mousetrap.bind('m', () => dispatch(activateMove()));
    Mousetrap.bind('p', () => dispatch(activatePan()));
    Mousetrap.bind('s', () => dispatch(activateSelect()));

    // Playback
    Mousetrap.bind('enter', () => dispatch(togglePlayPause()));
    Mousetrap.bind('escape', () => dispatch(stop()));
    Mousetrap.bind(['backspace', 'del'], () => dispatch(removeSelectedNotes()));

    // Nudge
    Mousetrap.bind('up', e => dispatch(nudgeSelectedNotes({ x: 0, y: -1 }, e)));
    Mousetrap.bind('down', e => dispatch(nudgeSelectedNotes({ x: 0, y: 1 }, e)));
    Mousetrap.bind('left', e => dispatch(nudgeSelectedNotes({ x: -1, y: 0 }, e)));
    Mousetrap.bind('right', e => dispatch(nudgeSelectedNotes({ x: 1, y: 0 }, e)));
  };
}

function activateDraw() {
  return (dispatch, getState) => {
    const toolType = sequence.constants.toolTypes.DRAW;
    const currentToolType = sequence.selectors.getToolType(getState());

    if (currentToolType === toolType) return;

    dispatch(sequence.actions.setToolType(toolType));
  };
}

function activateErase() {
  return (dispatch, getState) => {
    const toolType = sequence.constants.toolTypes.ERASE;
    const currentToolType = sequence.selectors.getToolType(getState());

    if (currentToolType === toolType) return;

    dispatch(sequence.actions.setToolType(toolType));
  };
}

function activateMove() {
  return (dispatch, getState) => {
    const toolType = sequence.constants.toolTypes.MOVE;
    const currentToolType = sequence.selectors.getToolType(getState());

    if (currentToolType === toolType) return;

    dispatch(sequence.actions.setToolType(toolType));
  };
}

function activatePan() {
  return (dispatch, getState) => {
    const toolType = sequence.constants.toolTypes.PAN;
    const currentToolType = sequence.selectors.getToolType(getState());

    if (currentToolType === toolType) return;

    dispatch(sequence.actions.setToolType(toolType));
  };
}

function activateSelect() {
  return (dispatch, getState) => {
    const toolType = sequence.constants.toolTypes.SELECT;
    const currentToolType = sequence.selectors.getToolType(getState());

    if (currentToolType === toolType) return;

    dispatch(sequence.actions.setToolType(toolType));
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
