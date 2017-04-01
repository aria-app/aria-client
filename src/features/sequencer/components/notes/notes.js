import { find, first, includes, isEqual, last } from 'lodash/fp';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import { Note } from '../note/note';
import './notes.scss';

const { toolTypes } = shared.constants;

export class Notes extends React.Component {
  static propTypes = {
    measureCount: React.PropTypes.number.isRequired,
    mousePoint: React.PropTypes.object.isRequired,
    notes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onErase: React.PropTypes.func.isRequired,
    onMove: React.PropTypes.func.isRequired,
    onNotePreview: React.PropTypes.func.isRequired,
    onNoteSelect: React.PropTypes.func.isRequired,
    onResize: React.PropTypes.func.isRequired,
    selectedNotes: React.PropTypes.arrayOf(
      React.PropTypes.object,
    ).isRequired,
    toolType: React.PropTypes.string.isRequired,
  }

  state = {
    isMoving: false,
    isResizing: false,
  };

  componentDidUpdate(prevProps) {
    const hasNotMoved = isEqual(prevProps.mousePoint, this.props.mousePoint);

    if (hasNotMoved) return;

    this.handleMousePointChange(prevProps.mousePoint);
  }

  render() {
    return h('.notes', {
      onMouseDown: this.handleMouseDown,
      onMouseLeave: this.handleMouseLeave,
      onMouseMove: this.handleMouseMove,
      onMouseUp: this.handleMouseUp,
      ref: this.setRef,
      style: this.getStyle(),
    }, [
      ...this.props.notes.map(note => h(Note, {
        className: 'notes__note',
        key: note.id,
        isSelected: this.getIsNoteSelected(note),
        onEndpointMouseDown: this.handleNoteEndpointMouseDown,
        onMouseDown: this.handleNoteMouseDown,
        onMouseUp: this.handleNoteMouseUp,
        note,
      })),
    ]);
  }

  getIsNoteSelected(note) {
    return !!find({
      id: note.id,
    })(this.props.selectedNotes);
  }

  getStyle() {
    return {
      width: this.props.measureCount * 4 * 8 * 40,
    };
  }

  handleMouseLeave = () => {
    if (this.state.isMoving) {
      this.stopMoving();
    }

    if (this.state.isResizing) {
      this.stopResizing();
    }
  }

  handleMousePointChange = (prevMousePoint) => {
    const delta = shared.helpers.getPointOffset(
      prevMousePoint,
      this.props.mousePoint,
    );

    if (this.state.isMoving) {
      this.props.onMove(delta);
    } else if (this.state.isResizing) {
      this.props.onResize(delta);
    }
  }

  handleMouseUp = () => {
    if (this.state.isMoving) {
      this.stopMoving();
    }

    if (this.state.isResizing) {
      this.stopResizing();
    }
  }

  handleNoteMouseDown = (note, e) => {
    const isAdditive = e.ctrlKey || e.metaKey;

    this.props.onNotePreview(first(note.points));

    if (!includes(note, this.props.selectedNotes)) {
      this.props.onNoteSelect(note, isAdditive);
    }

    this.startMoving();

    e.stopPropagation();
  }

  handleNoteMouseUp = (note) => {
    const { ERASE } = toolTypes;

    if (this.props.toolType === ERASE) {
      this.props.onErase(note);
    }
  }

  handleNoteEndpointMouseDown = (note, e) => {
    const { DRAW, SELECT } = toolTypes;

    if (this.props.toolType === DRAW || this.props.toolType === SELECT) {
      const isAdditive = e.ctrlKey || e.metaKey;
      this.props.onNotePreview(last(note.points));
      this.props.onNoteSelect(note, isAdditive);
      this.startResizing();
    }

    e.stopPropagation();
  }

  setRef = (ref) => {
    this.elementRef = ref;
  }

  startMoving = () => this.setState({
    isMoving: true,
  });

  startResizing = () => this.setState({
    isResizing: true,
  });

  stopMoving = () => this.setState({
    isMoving: false,
  });

  stopResizing = () => this.setState({
    isResizing: false,
  });
}
