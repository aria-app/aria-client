import React from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import classnames from 'classnames';
import { compose, mapProps, pure, setPropTypes, withHandlers } from 'recompose';
import shared from 'modules/shared';
import * as helpers from '../../helpers';
import { Note } from '../note/note';
import './notes.scss';

const component = (props) => h('.notes', {
  className: props.cursorClasses,
  onMouseDown: props.onMouseDown,
  onMouseMove: props.onMouseMove,
  onMouseUp: props.onMouseUp,
  style: props.style,
}, [
  ...props.noteComponents,
]);

const composed = compose([
  setPropTypes({
    moveUpdate: React.PropTypes.func.isRequired,
    draw: React.PropTypes.func.isRequired,
    erase: React.PropTypes.func.isRequired,
    fenceSelectStart: React.PropTypes.func.isRequired,
    fenceSelectUpdate: React.PropTypes.func.isRequired,
    isMoving: React.PropTypes.bool.isRequired,
    isPanning: React.PropTypes.bool.isRequired,
    measureCount: React.PropTypes.number.isRequired,
    notes: React.PropTypes.array.isRequired,
    resizeStart: React.PropTypes.func.isRequired,
    resizeUpdate: React.PropTypes.func,
    selectedNotes: React.PropTypes.array,
    selectNote: React.PropTypes.func,
    moveStart: React.PropTypes.func.isRequired,
    panStart: React.PropTypes.func.isRequired,
    panUpdate: React.PropTypes.func.isRequired,
    playNote: React.PropTypes.func.isRequired,
    toolType: React.PropTypes.string.isRequired,
    toolTypes: React.PropTypes.object.isRequired,
  }),
  shared.helpers.getElementRef(),
  mapProps(props => ({
    ...props,
    getMousePosition: (e) => helpers.getMousePosition(
      props.gridRef,
      props.sequenceContentRef,
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
  pure,
])(component);

export const Notes = composed;

function onMouseDown(props) {
  return (e) => {
    const { MOVE, PAN, SELECT } = props.toolTypes;

    if (props.toolType === MOVE) {
      props.moveStart();
    } else if (props.toolType === PAN) {
      props.panStart(props.elementRef, e);
    } else if (props.toolType === SELECT) {
      props.fenceSelectStart(
        props.getMousePosition(e),
        e.ctrlKey || e.metaKey
      );
    }

    return false;
  };
}

function onMouseMove(props) {
  return (e) => {
    const { isMoving, isPanning, isResizing, isSelecting } = props;

    if (isMoving) {
      props.moveUpdate(props.getMousePosition(e));
    } else if (isPanning) {
      props.panUpdate(props.elementRef, e);
    } else if (isResizing) {
      props.resizeUpdate(props.getMousePosition(e));
    } else if (isSelecting) {
      props.fenceSelectUpdate(
        props.getMousePosition(e),
        e.ctrlKey || e.metaKey
      );
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
      props.playNote(note.name);
      props.selectNote(note, e.ctrlKey || e.metaKey);
      props.moveStart(props.getMousePosition(e));
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
      props.moveStart();
    } else if (toolType === DRAW || toolType === SELECT) {
      props.playNote(note.endName);
      props.selectNote(note, e.ctrlKey || e.metaKey);
      props.resizeStart();
    }

    e.stopPropagation();
  };
}
