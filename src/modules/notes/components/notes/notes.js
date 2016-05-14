import React from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import classnames from 'classnames';
import { compose, mapProps, pure, setPropTypes, withHandlers } from 'recompose';
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
    drag: React.PropTypes.func.isRequired,
    draw: React.PropTypes.func.isRequired,
    eraseNote: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired,
    isPanning: React.PropTypes.bool.isRequired,
    measureCount: React.PropTypes.number.isRequired,
    notes: React.PropTypes.array.isRequired,
    pan: React.PropTypes.func.isRequired,
    resize: React.PropTypes.func,
    selectedNotes: React.PropTypes.array,
    selectNote: React.PropTypes.func,
    startDragging: React.PropTypes.func.isRequired,
    startPanning: React.PropTypes.func.isRequired,
    startResizing: React.PropTypes.func.isRequired,
    toolType: React.PropTypes.string.isRequired,
    toolTypes: React.PropTypes.object.isRequired,
    selectInFence: React.PropTypes.func.isRequired,
  }),
  withHandlers({
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onNoteMouseDown,
    onNoteMouseUp,
    onNoteEndpointMouseDown,
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
      props.startDragging();
    } else if (props.toolType === PAN) {
      props.startPanning(props.elementRef, e);
    } else if (props.toolType === SELECT) {
      props.startSelecting(
        helpers.getMousePosition(props.elementRef, e.pageX, e.pageY),
        e.ctrlKey || e.metaKey
      );
    }

    return false;
  };
}

function onMouseMove(props) {
  return (e) => {
    const { isDragging, isPanning, isResizing, isSelecting } = props;

    if (isDragging) {
      props.drag(helpers.getMousePosition(props.elementRef, e.pageX, e.pageY));
    } else if (isPanning) {
      props.pan(props.elementRef, e);
    } else if (isResizing) {
      props.resize(helpers.getMousePosition(props.elementRef, e.pageX, e.pageY));
    } else if (isSelecting) {
      props.selectInFence(
        helpers.getMousePosition(props.elementRef, e.pageX, e.pageY),
        e.ctrlKey || e.metaKey
      );
    }
  };
}

function onMouseUp(props) {
  return (e) => {
    const { isDragging, isPanning, isResizing, isSelecting } = props;

    if (isDragging || isPanning || isResizing || isSelecting) return;

    if (props.toolType === props.toolTypes.DRAW) {
      props.draw(helpers.getMousePosition(props.elementRef, e.pageX, e.pageY));
    }
  };
}

function onNoteMouseDown(props) {
  return (note, e) => {
    const { toolType, toolTypes } = props;
    const { DRAW, SELECT } = toolTypes;

    if (toolType === DRAW || toolType === SELECT) {
      props.selectNote(note, e.ctrlKey || e.metaKey);
      props.startDragging(helpers.getMousePosition(props.elementRef, e.pageX, e.pageY));
      e.stopPropagation();
      return false;
    }

    return true;
  };
}

function onNoteMouseUp(props) {
  return (note, e) => {
    const { toolType, toolTypes } = props;
    const { DRAW, ERASE } = toolTypes;

    if (toolType === DRAW) {
      e.stopPropagation();
    } else if (toolType === ERASE) {
      props.eraseNote(note);
    }
  };
}

function onNoteEndpointMouseDown(props) {
  return (note, e) => {
    const { toolType, toolTypes } = props;
    const { DRAW, MOVE, SELECT } = toolTypes;

    if (toolType === MOVE) {
      props.startDragging();
    } else if (toolType === DRAW || toolType === SELECT) {
      props.selectNote(note, e.ctrlKey || e.metaKey);
      props.startResizing();
    }

    e.stopPropagation();
  };
}
