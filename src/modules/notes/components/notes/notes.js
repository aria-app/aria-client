import React from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import classnames from 'classnames';
import { compose, mapProps, pure } from 'recompose';
import sequence from 'modules/sequence';
import * as helpers from '../../helpers';
import { Note } from '../note/note';
import './notes.scss';

const component = ({
  cursorClasses,
  measureCount,
  notes,
  onMouseDown,
  onMouseUp,
  onBackgroundMouseDown,
  onBackgroundMouseUp,
  onBackgroundMouseMove,
  selectedNotes,
  setElementRef,
}) => h('.notes', {
  style: {
    width: measureCount * 4 * 8 * 40,
  },
  className: cursorClasses,
  onMouseMove: onBackgroundMouseMove,
  onMouseDown: onBackgroundMouseDown,
  onMouseUp: onBackgroundMouseUp,
  ref: setElementRef,
}, notes.map((note, index) =>
  h(Note, {
    key: index,
    isSelected: !!_.find(selectedNotes, { id: note.id }),
    note,
    onMouseDown,
    onMouseUp,
  })
));

const composed = compose([
  mapProps(props => ({
    ...props,
    cursorClasses: classnames({
      'notes--grab': props.toolType === sequence.constants.toolTypes.PAN,
    }),
  })),
  pure,
])(component);

const classified = React.createClass({
  propTypes: {
    drag: React.PropTypes.func,
    dragOffset: React.PropTypes.object,
    dragStartPosition: React.PropTypes.object,
    draw: React.PropTypes.func,
    isDragging: React.PropTypes.bool,
    isPanning: React.PropTypes.bool,
    measureCount: React.PropTypes.number.isRequired,
    notes: React.PropTypes.array,
    eraseNote: React.PropTypes.func,
    panStart: React.PropTypes.object,
    playNote: React.PropTypes.func,
    select: React.PropTypes.func,
    selectedNotes: React.PropTypes.array,
    setElementRef: React.PropTypes.func,
    startDragging: React.PropTypes.func,
    stopDragging: React.PropTypes.func,
    startPanning: React.PropTypes.func,
    stopPanning: React.PropTypes.func,
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
        this.props.startPanning(helpers.getPanStart(this.elementRef, e));
        break;
      case toolTypes.SELECT:
        break;
      default:
    }

    return false;
  },
  onBackgroundMouseUp(e) {
    const { toolTypes } = sequence.constants;
    switch (this.props.toolType) {
      case toolTypes.DRAW:
        this.props.draw(helpers.getMousePosition(this.elementRef, e.pageX, e.pageY));
        break;
      case toolTypes.ERASE:
        break;
      case toolTypes.MOVE:
        break;
      case toolTypes.PAN:
        break;
      case toolTypes.SELECT:
        this.props.select([]);
        break;
      default:
    }

    if (this.props.isDragging) {
      this.props.stopDragging();
    }

    if (this.props.isPanning) {
      this.props.stopPanning();
    }
  },
  onBackgroundMouseMove(e) {
    if (this.props.isDragging) {
      this.props.drag(helpers.getMousePosition(this.elementRef, e.pageX, e.pageY));
    }

    if (this.props.isPanning) {
      helpers.panScrollContainer(this.elementRef, e, this.props.panStart);
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
        this.props.playNote(note.name);
        if (e.ctrlKey || e.metaKey) {
          if (_.includes(this.props.selectedNotes, note)) {
            this.props.select(_.without(this.props.selectedNotes, note));
          } else {
            this.props.select([...this.props.selectedNotes, note]);
          }
        } else {
          if (!_.includes(this.props.selectedNotes, note)) {
            this.props.select([note]);
          }
        }
        this.props.startDragging(helpers.getMousePosition(this.elementRef, e.pageX, e.pageY));
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
        break;
      default:
    }

    if (this.props.isDragging) {
      this.props.stopDragging();
    }

    if (this.props.isPanning) {
      this.props.stopPanning();
    }

    e.stopPropagation();
  },
  setElementRef(ref) {
    this.elementRef = ref;
  },
});


export const Notes = classified;
