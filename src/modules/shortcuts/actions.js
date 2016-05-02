import Mousetrap from 'mousetrap';
import drag from 'modules/drag';
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
    Mousetrap.bind(['backspace', 'del'], () => dispatch(removeSelectedNote()));

    // Nudge
    Mousetrap.bind('up', e => dispatch(nudgeSelectedNote({ x: 0, y: -1 }, e)));
    Mousetrap.bind('down', e => dispatch(nudgeSelectedNote({ x: 0, y: 1 }, e)));
    Mousetrap.bind('left', e => dispatch(nudgeSelectedNote({ x: -1, y: 0 }, e)));
    Mousetrap.bind('right', e => dispatch(nudgeSelectedNote({ x: 1, y: 0 }, e)));
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

function nudgeSelectedNote(offset, e) {
  e.preventDefault();
  return (dispatch, getState) => {
    const selectedNote = notes.selectors.getSelectedNote(getState());

    if (!selectedNote) return;

    const newPosition = drag.helpers.addPositions(
      selectedNote.position,
      offset
    );

    dispatch(notes.actions.move(selectedNote, newPosition));
  };
}

function removeSelectedNote() {
  return (dispatch, getState) => {
    const selectedNote = notes.selectors.getSelectedNote(getState());

    if (!selectedNote) return;

    dispatch(notes.actions.remove(selectedNote));
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
