import React from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import classnames from 'classnames';
import { compose, mapProps, pure, setDisplayName, setPropTypes, withHandlers } from 'recompose';
import shared from 'ducks/shared';
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
  props.ghostNote,
  ...props.noteComponents,
]);

const composed = compose([
  setDisplayName('Notes'),
  getElementRef(),
  pure,
  setPropTypes({
    draw: React.PropTypes.func.isRequired,
    erase: React.PropTypes.func.isRequired,
    isMoving: React.PropTypes.bool.isRequired,
    isPanning: React.PropTypes.bool.isRequired,
    measureCount: React.PropTypes.number.isRequired,
    mousePoint: React.PropTypes.object,
    notes: React.PropTypes.array.isRequired,
    previewNote: React.PropTypes.func.isRequired,
    selectedNotes: React.PropTypes.array.isRequired,
    selectNote: React.PropTypes.func.isRequired,
    startMoving: React.PropTypes.func.isRequired,
    startResizing: React.PropTypes.func.isRequired,
    startSelecting: React.PropTypes.func.isRequired,
    toolType: React.PropTypes.string.isRequired,
    toolTypes: React.PropTypes.object.isRequired,
    updateMoving: React.PropTypes.func.isRequired,
    updateResizing: React.PropTypes.func.isRequired,
    updateSelecting: React.PropTypes.func.isRequired,
  }),
  mapProps(props => ({
    ...props,
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
    ghostNote: props.toolType === props.toolTypes.DRAW
      ? h(Note, {
        className: 'ghost',
        note: {
          points: [
            {
              x: props.mousePoint ? props.mousePoint.x : 0,
              y: props.mousePoint ? props.mousePoint.y : 0,
            },
            {
              x: props.mousePoint ? props.mousePoint.x + 1 : 0,
              y: props.mousePoint ? props.mousePoint.y : 0,
            },
          ],
        },
      })
      : null,
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
      width: props.measureCount !== undefined
        ? props.measureCount * 4 * 8 * 40
        : 0,
    },
  })),
])(component);

export const Notes = composed;

function onMouseDown(props) {
  return (e) => {
    const { MOVE, SELECT } = props.toolTypes;

    if (props.toolType === MOVE) {
      props.startMoving();
    } else if (props.toolType === SELECT) {
      const isAdditive = e.ctrlKey || e.metaKey;
      props.startSelecting(isAdditive);
    }

    return false;
  };
}

function onMouseMove(props) {
  return (e) => {
    const { isMoving, isResizing, isSelecting } = props;

    if (isMoving) {
      props.updateMoving();
    } else if (isResizing) {
      props.updateResizing();
    } else if (isSelecting) {
      const isAdditive = e.ctrlKey || e.metaKey;
      props.updateSelecting(isAdditive);
    }
  };
}

function onMouseUp(props) {
  return () => {
    const { isMoving, isPanning, isResizing, isSelecting } = props;

    if (isMoving || isPanning || isResizing || isSelecting) return;

    if (props.toolType === props.toolTypes.DRAW) {
      props.draw();
    }
  };
}

function onNoteMouseDown(props) {
  return (note, e) => {
    const { toolType, toolTypes } = props;
    const { DRAW, SELECT } = toolTypes;

    if (toolType === DRAW || toolType === SELECT) {
      const isAdditive = e.ctrlKey || e.metaKey;
      props.previewNote(_.first(note.points));
      props.selectNote(note, isAdditive);
      props.startMoving();
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
      props.previewNote(_.last(note.points));
      props.selectNote(note, isAdditive);
      props.startResizing();
    }

    e.stopPropagation();
  };
}
