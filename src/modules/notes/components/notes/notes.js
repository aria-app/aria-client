import React from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import classnames from 'classnames';
import { compose, mapProps, pure, setPropTypes, withHandlers } from 'recompose';
import sequence from 'modules/sequence';
import * as helpers from '../../helpers';
import { Note } from '../note/note';
import './notes.scss';

const component = ({
  cursorClasses,
  measureCount,
  notes,
  onBackgroundMouseDown,
  onBackgroundMouseMove,
  onBackgroundMouseUp,
  onEndpointMouseDown,
  onEndpointMouseUp,
  onNoteMouseDown,
  onNoteMouseUp,
  selectedNotes,
}) => h('.notes', {
  style: {
    width: measureCount * 4 * 8 * 40,
  },
  className: cursorClasses,
  onMouseDown: onBackgroundMouseDown,
  onMouseMove: onBackgroundMouseMove,
  onMouseUp: onBackgroundMouseUp,
}, notes.map((note, index) =>
  h(Note, {
    key: index,
    isSelected: !!_.find(selectedNotes, { id: note.id }),
    note,
    onEndpointMouseDown,
    onEndpointMouseUp,
    onMouseDown: onNoteMouseDown,
    onMouseUp: onNoteMouseUp,
  })
));

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
    stopDragging: React.PropTypes.func,
    stopPanning: React.PropTypes.func,
    stopResizing: React.PropTypes.func,
    toolType: React.PropTypes.string,
    updateFence: React.PropTypes.func,
  }),
  mapProps(props => ({
    ...props,
    cursorClasses: classnames({
      'notes--grab': props.toolType === sequence.constants.toolTypes.PAN,
    }),
  })),
  withHandlers({
    onBackgroundMouseDown: props => e => {
      const { toolTypes } = sequence.constants;
      switch (props.toolType) {
        case toolTypes.DRAW:
          break;
        case toolTypes.ERASE:
          break;
        case toolTypes.MOVE:
          props.startDragging();
          break;
        case toolTypes.PAN:
          props.startPanning(props.elementRef, e);
          break;
        case toolTypes.SELECT:
          props.startSelecting(
            helpers.getMousePosition(props.elementRef, e.pageX, e.pageY),
            e.ctrlKey || e.metaKey
          );
          break;
        default:
      }

      return false;
    },
    onBackgroundMouseMove: props => e => {
      if (props.isDragging) {
        props.drag(helpers.getMousePosition(props.elementRef, e.pageX, e.pageY));
      }

      if (props.isPanning) {
        props.pan(props.elementRef, e);
      }

      if (props.isResizing) {
        props.resize(helpers.getMousePosition(props.elementRef, e.pageX, e.pageY));
      }

      if (props.isSelecting) {
        props.updateFence(
          helpers.getMousePosition(props.elementRef, e.pageX, e.pageY),
          e.ctrlKey || e.metaKey
        );
      }
    },
    onBackgroundMouseUp: props => e => {
      const { toolTypes } = sequence.constants;
      switch (props.toolType) {
        case toolTypes.DRAW:
          props.draw(helpers.getMousePosition(props.elementRef, e.pageX, e.pageY));
          if (!_.isEmpty(props.selectedNotes)) {
            props.select([]);
          }
          break;
        case toolTypes.ERASE:
          break;
        case toolTypes.MOVE:
          break;
        case toolTypes.PAN:
          break;
        case toolTypes.SELECT:
          break;
        default:
      }

      if (props.isDragging) {
        props.stopDragging();
      }

      if (props.isPanning) {
        props.stopPanning();
      }

      if (props.isResizing) {
        props.stopResizing();
      }

      if (props.isSelecting) {
        props.stopSelecting();
      }
    },
    onEndpointMouseDown: props => (note, e) => {
      const { toolTypes } = sequence.constants;
      switch (props.toolType) {
        case toolTypes.ERASE:
          return e.stopPropagation();
        case toolTypes.MOVE:
          props.startDragging();
          return e.stopPropagation();
        case toolTypes.PAN:
          return e.stopPropagation();
        case toolTypes.DRAW:
        case toolTypes.SELECT:
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
          return e.stopPropagation();
        default:
          return true;
      }
    },
    onEndpointMouseUp: props => (note, e) => {
      const { toolTypes } = sequence.constants;
      switch (props.toolType) {
        case toolTypes.DRAW:
          break;
        case toolTypes.ERASE:
          break;
        case toolTypes.MOVE:
          break;
        case toolTypes.PAN:
          break;
        case toolTypes.SELECT:
          break;
        default:
      }

      if (props.isDragging) {
        props.stopDragging();
      }

      if (props.isPanning) {
        props.stopPanning();
      }

      if (props.isResizing) {
        props.stopResizing();
      }

      if (props.isSelecting) {
        props.stopSelecting();
      }

      e.stopPropagation();
    },
    onNoteMouseDown: props => (note, e) => {
      const { toolTypes } = sequence.constants;
      switch (props.toolType) {
        case toolTypes.ERASE:
          return e.stopPropagation();
        case toolTypes.MOVE:
          props.startDragging();
          return e.stopPropagation();
        case toolTypes.PAN:
          return e.stopPropagation();
        case toolTypes.DRAW:
        case toolTypes.SELECT:
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
          return e.stopPropagation();
        default:
          return true;
      }
    },
    onNoteMouseUp: props => (note, e) => {
      const { toolTypes } = sequence.constants;
      switch (props.toolType) {
        case toolTypes.DRAW:
          break;
        case toolTypes.ERASE:
          props.eraseNote(note);
          break;
        case toolTypes.MOVE:
          break;
        case toolTypes.PAN:
          break;
        case toolTypes.SELECT:
          break;
        default:
      }

      if (props.isDragging) {
        props.stopDragging();
      }

      if (props.isPanning) {
        props.stopPanning();
      }

      if (props.isResizing) {
        props.stopResizing();
      }

      if (props.isSelecting) {
        props.stopSelecting();
      }

      e.stopPropagation();
    },
  }),
  pure,
])(component);

export const Notes = composed;
