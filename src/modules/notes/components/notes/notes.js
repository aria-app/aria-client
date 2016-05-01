import React from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import { compose, pure, setPropTypes, withHandlers } from 'recompose';
import sequence from 'modules/sequence';
import * as helpers from '../../helpers';
import { Note } from '../note/note';
import './notes.scss';

const component = ({
  notes,
  onMouseDown,
  onMouseUp,
  onBackgroundMove,
  onBackgroundMouseUp,
  // onPress,
  selectedNotes,
  setElementRef,
}) => h('.notes', {
  onMouseMove: onBackgroundMove,
  onMouseUp: onBackgroundMouseUp,
  ref: setElementRef,
}, notes.map((note, index) =>
  h(Note, {
    key: index,
    isSelected: _.includes(selectedNotes, note),
    note,
    onMouseDown,
    onMouseUp,
    // onPress,
  })
));

const composed = compose([
  setPropTypes({
    dragEvent: React.PropTypes.object,
    drawNote: React.PropTypes.func,
    notes: React.PropTypes.array,
    eraseNote: React.PropTypes.func,
    onBackgroundMouseUp: React.PropTypes.func,
    onBackgroundMove: React.PropTypes.func,
    playNote: React.PropTypes.func,
    selectNotes: React.PropTypes.func,
    selectedNotes: React.PropTypes.array,
    setElementRef: React.PropTypes.func,
    startDragging: React.PropTypes.func,
    stopDragging: React.PropTypes.func,
    toolType: React.PropTypes.string,
  }),
  withHandlers({
    onMouseDown: ({ startDragging }) => note => {
      startDragging(note);
    },
    onMouseUp: ({ stopDragging }) => () => {
      stopDragging();
    },
    onPress: ({
      eraseNote,
      selectNotes,
      selectedNotes,
      toolType,
    }) => (note, isCtrlPressed) => {
      if (toolType === sequence.constants.toolTypes.ERASE) {
        eraseNote(note);
        return;
      }

      if (toolType !== sequence.constants.toolTypes.SELECT) return;

      if (!isCtrlPressed) {
        selectNotes([note]);
        return;
      }

      if (_.includes(selectedNotes, note)) {
        selectNotes(_.without(selectedNotes, note));
      } else {
        selectNotes(selectedNotes.concat([note]));
      }
    },
  }),
  pure,
])(component);

const classified = React.createClass({
  render() {
    return h(composed, {
      onBackgroundMouseUp: this.onBackgroundMouseUp,
      onBackgroundMove: this.onBackgroundMove,
      setElementRef: this.setElementRef,
      ...this.props,
    });
  },
  onBackgroundMouseUp(e) {
    if (this.props.dragEvent) {
      this.props.stopDragging();
      return;
    }

    if (this.props.toolType !== sequence.constants.toolTypes.DRAW) return;

    const position = helpers.getMousePosition(e);

    this.props.drawNote({
      length: '32n',
      position,
    });
  },
  onBackgroundMove(e) {
    if (!this.props.dragEvent) return;

    const newPosition = helpers.getMousePosition(this.elementRef, e.pageX, e.pageY);
    const prevOffset = this.props.dragEvent.offset;
    const newOffset = helpers.getPositionOffset(this.props.dragEvent.startPosition, newPosition);

    if (!prevOffset || !_.isEqual(prevOffset, newOffset)) {
      this.props.drag(newPosition);
    }
  },
  setElementRef(ref) {
    this.elementRef = ref;
  },
});


export const Notes = classified;
