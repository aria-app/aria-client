import React from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import classnames from 'classnames';
import { compose, mapProps, pure, setPropTypes, withHandlers } from 'recompose';
import shared from 'modules/shared';
import * as helpers from '../../helpers';
import { Note } from '../note/note';
import './notes.scss';

const { getElementRef } = shared.helpers;

const component = (props) => h('.notes', {
  className: props.cursorClasses,
  onMouseDown: props.onMouseDown,
  onMouseMove: props.onMouseMove,
  onMouseUp: props.onMouseUp,
  style: props.style,
}, [
  // props.ghostNote,
  ...props.noteComponents,
]);

const composed = compose([
  getElementRef(),
  pure,
  setPropTypes({
    draw: React.PropTypes.func.isRequired,
    erase: React.PropTypes.func.isRequired,
    isMoving: React.PropTypes.bool.isRequired,
    isPanning: React.PropTypes.bool.isRequired,
    measureCount: React.PropTypes.number.isRequired,
    mousePosition: React.PropTypes.object,
    notes: React.PropTypes.array.isRequired,
    playNote: React.PropTypes.func.isRequired,
    scrollLeftElement: React.PropTypes.object,
    scrollTopElement: React.PropTypes.object,
    selectedNotes: React.PropTypes.array.isRequired,
    selectNote: React.PropTypes.func.isRequired,
    setMousePosition: React.PropTypes.func.isRequired,
    startMoving: React.PropTypes.func.isRequired,
    startPanning: React.PropTypes.func.isRequired,
    startResizing: React.PropTypes.func.isRequired,
    startSelection: React.PropTypes.func.isRequired,
    toolType: React.PropTypes.string.isRequired,
    toolTypes: React.PropTypes.object.isRequired,
    updateMoving: React.PropTypes.func.isRequired,
    updatePanning: React.PropTypes.func.isRequired,
    updateResizing: React.PropTypes.func.isRequired,
    updateSelection: React.PropTypes.func.isRequired,
  }),
  mapProps(props => ({
    ...props,
    getMousePosition: (e) => helpers.getMousePosition(
      props.scrollLeftElement,
      props.scrollTopElement,
      e
    ),
    startPanningWithElements: e => props.startPanning(
      props.scrollLeftElement,
      props.scrollTopElement,
      e
    ),
    updatePanningWithElements: e => props.updatePanning(
      props.scrollLeftElement,
      props.scrollTopElement,
      e
    ),
  })),
  withHandlers({
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onNoteEndpointMouseDown,
    onNoteMouseDown,
    onNoteMouseUp,
  }),
  mapProps(props => ({
    ...props,
    cursorClasses: classnames({
      'notes--grab': props.toolType === props.toolTypes.PAN,
    }),
    // ghostNote: props.toolType === props.toolTypes.DRAW
    //   ? h(Note, {
    //     note: {
    //       endPosition: {
    //         x: props.mousePosition ? props.mousePosition.x + 1 : 0,
    //         y: props.mousePosition ? props.mousePosition.y : 0,
    //       },
    //       position: {
    //         x: props.mousePosition ? props.mousePosition.x : 0,
    //         y: props.mousePosition ? props.mousePosition.y : 0,
    //       },
    //     },
    //     className: 'ghost',
    //     onEndpointMouseDown: () => {},
    //     onEndpointMouseUp: () => {},
    //     onMouseDown: () => {},
    //     onMouseUp: () => {},
    //   })
    //   : null,
    noteComponents: props.notes.map((note, index) =>
      h(Note, {
        key: index,
        isSelected: !!_.find(props.selectedNotes, { id: note.id }),
        onEndpointMouseDown: props.onNoteEndpointMouseDown,
        onEndpointMouseUp: props.onNoteEndpointMouseUp,
        onMouseDown: props.onNoteMouseDown,
        onMouseUp: props.onNoteMouseUp,
        note,
      })
    ),
    style: {
      width: props.measureCount * 4 * 8 * 40,
    },
  })),
])(component);

export const Notes = composed;

function onMouseDown(props) {
  return (e) => {
    const { MOVE, PAN, SELECT } = props.toolTypes;

    if (props.toolType === MOVE) {
      props.startMoving();
    } else if (props.toolType === PAN) {
      props.startPanningWithElements(e);
    } else if (props.toolType === SELECT) {
      const isAdditive = e.ctrlKey || e.metaKey;
      props.startSelection(props.getMousePosition(e), isAdditive);
    }

    return false;
  };
}

function onMouseMove(props) {
  return (e) => {
    const { isMoving, isPanning, isResizing, isSelecting } = props;

    const mousePosition = props.getMousePosition(e);

    if (!_.isEqual(props.mousePosition, mousePosition)) {
      props.setMousePosition(mousePosition);
    }

    if (isMoving) {
      props.updateMoving(props.getMousePosition(e));
    } else if (isPanning) {
      props.updatePanningWithElements(e);
    } else if (isResizing) {
      props.updateResizing(props.getMousePosition(e));
    } else if (isSelecting) {
      const isAdditive = e.ctrlKey || e.metaKey;
      props.updateSelection(props.getMousePosition(e), isAdditive);
    }
  };
}

function onMouseUp(props) {
  return (e) => {
    const { isMoving, isPanning, isResizing, isSelecting } = props;

    if (isMoving || isPanning || isResizing || isSelecting) return;

    if (props.toolType === props.toolTypes.DRAW) {
      props.draw(props.getMousePosition(e));
    }
  };
}

function onNoteMouseDown(props) {
  return (note, e) => {
    const { toolType, toolTypes } = props;
    const { DRAW, SELECT } = toolTypes;

    if (toolType === DRAW || toolType === SELECT) {
      const isAdditive = e.ctrlKey || e.metaKey;
      props.playNote(note.name);
      props.selectNote(note, isAdditive);
      props.startMoving(props.getMousePosition(e));
      e.stopPropagation();
      return false;
    }

    return true;
  };
}

function onNoteMouseUp(props) {
  return (note) => {
    const { toolType, toolTypes } = props;
    const { ERASE } = toolTypes;

    if (toolType === ERASE) {
      props.erase(note);
    }
  };
}

function onNoteEndpointMouseDown(props) {
  return (note, e) => {
    const { toolType, toolTypes } = props;
    const { DRAW, MOVE, SELECT } = toolTypes;

    if (toolType === MOVE) {
      props.startMoving();
    } else if (toolType === DRAW || toolType === SELECT) {
      const isAdditive = e.ctrlKey || e.metaKey;
      props.playNote(note.endName);
      props.selectNote(note, isAdditive);
      props.startResizing();
    }

    e.stopPropagation();
  };
}
