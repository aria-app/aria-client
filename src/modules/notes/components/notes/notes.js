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
    drag: React.PropTypes.func,
    draw: React.PropTypes.func,
    isDragging: React.PropTypes.bool,
    isPanning: React.PropTypes.bool,
    measureCount: React.PropTypes.number.isRequired,
    notes: React.PropTypes.array,
    eraseNote: React.PropTypes.func,
    pan: React.PropTypes.func,
    playNote: React.PropTypes.func,
    resize: React.PropTypes.func,
    select: React.PropTypes.func,
    selectedNotes: React.PropTypes.array,
    startDragging: React.PropTypes.func,
    startPanning: React.PropTypes.func,
    startResizing: React.PropTypes.func,
    stopHeldActions: React.PropTypes.func,
    toolType: React.PropTypes.string,
    updateFence: React.PropTypes.func,
  }),
  withHandlers({
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onNoteMouseDown,
    onNoteMouseUp,
    onNoteEndpointMouseDown,
    onNoteEndpointMouseUp,
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

export function onMouseDown(props) {
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

export function onMouseMove(props) {
  return (e) => {
    const { isDragging, isPanning, isResizing, isSelecting } = props;

    if (isDragging) {
      props.drag(helpers.getMousePosition(props.elementRef, e.pageX, e.pageY));
    } else if (isPanning) {
      props.pan(props.elementRef, e);
    } else if (isResizing) {
      props.resize(helpers.getMousePosition(props.elementRef, e.pageX, e.pageY));
    } else if (isSelecting) {
      props.updateFence(
        helpers.getMousePosition(props.elementRef, e.pageX, e.pageY),
        e.ctrlKey || e.metaKey
      );
    }
  };
}

export function onMouseUp(props) {
  return (e) => {
    if (props.toolType === props.toolTypes.DRAW) {
      props.draw(helpers.getMousePosition(props.elementRef, e.pageX, e.pageY));
      if (!_.isEmpty(props.selectedNotes)) {
        props.select([]);
      }
    }
    props.stopHeldActions();
  };
}

export function onNoteMouseDown(props) {
  return (note, e) => {
    const { toolType, toolTypes } = props;
    const { DRAW, SELECT } = toolTypes;

    if (toolType === DRAW || toolType === SELECT) {
      props.playNote(note.name);
      if (e.ctrlKey || e.metaKey) {
        if (_.includes(props.selectedNotes, note)) {
          props.select(_.without(props.selectedNotes, note));
        } else {
          props.select([...props.selectedNotes, note]);
        }
      } else {
        if (!_.includes(props.selectedNotes, note)) {
          props.select([note]);
        }
      }
      props.startDragging(helpers.getMousePosition(props.elementRef, e.pageX, e.pageY));
      e.stopPropagation();
      return false;
    }

    return true;
  };
}

export function onNoteMouseUp(props) {
  return (note, e) => {
    const { toolType, toolTypes } = props;
    const { DRAW, ERASE } = toolTypes;

    if (toolType === DRAW) {
      e.stopPropagation();
      props.stopHeldActions();
    } else if (toolType === ERASE) {
      props.eraseNote(note);
    }
  };
}

export function onNoteEndpointMouseDown(props) {
  return (note, e) => {
    const { toolType, toolTypes } = props;
    const { DRAW, MOVE, SELECT } = toolTypes;

    if (toolType === MOVE) {
      props.startDragging();
    } else if (toolType === DRAW || toolType === SELECT) {
      props.playNote(note.name);
      if (e.ctrlKey || e.metaKey) {
        if (_.includes(props.selectedNotes, note)) {
          props.select(_.without(props.selectedNotes, note));
        } else {
          props.select([...props.selectedNotes, note]);
        }
      } else {
        if (!_.includes(props.selectedNotes, note)) {
          props.select([note]);
        }
      }
      props.startResizing();
    }

    e.stopPropagation();
  };
}

export function onNoteEndpointMouseUp(props) {
  return (note, e) => {
    props.stopHeldActions();
    e.stopPropagation();
  };
}
