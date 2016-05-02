import React from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import { compose, pure } from 'recompose';
import sequence from 'modules/sequence';
import * as helpers from '../../helpers';
import { Note } from '../note/note';
import './notes.scss';

const component = ({
  measureCount,
  notes,
  onMouseDown,
  onMouseUp,
  onBackgroundMouseDown,
  onBackgroundMouseUp,
  onBackgroundMouseMove,
  selectedNote,
  setElementRef,
}) => h('.notes', {
  style: {
    width: measureCount * 4 * 8 * 40,
  },
  onMouseMove: onBackgroundMouseMove,
  onMouseDown: onBackgroundMouseDown,
  onMouseUp: onBackgroundMouseUp,
  ref: setElementRef,
}, notes.map((note, index) =>
  h(Note, {
    key: index,
    isSelected: selectedNote && selectedNote.id === note.id,
    note,
    onMouseDown,
    onMouseUp,
  })
));

const composed = compose([
  pure,
])(component);

const classified = React.createClass({
  propTypes: {
    dragEvent: React.PropTypes.object,
    drawNote: React.PropTypes.func,
    measureCount: React.PropTypes.number.isRequired,
    notes: React.PropTypes.array,
    eraseNote: React.PropTypes.func,
    playNote: React.PropTypes.func,
    selectNote: React.PropTypes.func,
    selectedNote: React.PropTypes.object,
    setElementRef: React.PropTypes.func,
    startDragging: React.PropTypes.func,
    stopDragging: React.PropTypes.func,
    toolType: React.PropTypes.string,
  },
  render() {
    return h(composed, {
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
      onBackgroundMouseDown: this.onBackgroundMouseDown,
      onBackgroundMouseUp: this.onBackgroundMouseUp,
      onBackgroundMouseMove: this.onBackgroundMouseMove,
      setElementRef: this.setElementRef,
      ...this.props,
    });
  },
  onBackgroundMouseDown(e) {
    const { toolTypes } = sequence.constants;
    switch (this.props.toolType) {
      case toolTypes.DRAW:
        break;
      case toolTypes.ERASE:
        break;
      case toolTypes.MOVE:
        this.props.startDragging(helpers.getMousePosition(this.elementRef, e.pageX, e.pageY));
        break;
      case toolTypes.PAN:
        break;
      case toolTypes.SELECT:
        break;
      default:
    }
  },
  onBackgroundMouseUp(e) {
    const { toolTypes } = sequence.constants;
    switch (this.props.toolType) {
      case toolTypes.DRAW:
        this.props.drawNote(helpers.getMousePosition(this.elementRef, e.pageX, e.pageY));
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

    if (this.props.dragEvent) {
      this.props.stopDragging();
      return;
    }
  },
  onBackgroundMouseMove(e) {
    if (!this.props.dragEvent) return;

    const newPosition = helpers.getMousePosition(this.elementRef, e.pageX, e.pageY);
    const prevOffset = this.props.dragEvent.offset;
    const newOffset = helpers.getPositionOffset(this.props.dragEvent.startPosition, newPosition);

    if (!prevOffset || !_.isEqual(prevOffset, newOffset)) {
      this.props.drag(newPosition);
    }
  },
  onMouseDown(note, e) {
    const { toolTypes } = sequence.constants;
    switch (this.props.toolType) {
      case toolTypes.DRAW:
        return e.stopPropagation();
      case toolTypes.ERASE:
        return e.stopPropagation();
      case toolTypes.MOVE:
        this.props.startDragging(helpers.getMousePosition(this.elementRef, e.pageX, e.pageY));
        return e.stopPropagation();
      case toolTypes.PAN:
        return e.stopPropagation();
      case toolTypes.SELECT:
        return e.stopPropagation();
      default:
        return true;
    }
  },
  onMouseUp(note, e) {
    const { toolTypes } = sequence.constants;
    switch (this.props.toolType) {
      case toolTypes.DRAW:
        this.props.playNote(note.name);
        break;
      case toolTypes.ERASE:
        this.props.eraseNote(note);
        break;
      case toolTypes.MOVE:
        break;
      case toolTypes.PAN:
        break;
      case toolTypes.SELECT:
        if (this.props.selectedNote && this.props.selectedNote.id === note.id) {
          this.props.selectNote(undefined);
        } else {
          this.props.selectNote(note);
        }
        break;
      default:
    }

    if (this.props.dragEvent) {
      this.props.stopDragging();
    }

    e.stopPropagation();
  },
  setElementRef(ref) {
    this.elementRef = ref;
  },
});


export const Notes = classified;
