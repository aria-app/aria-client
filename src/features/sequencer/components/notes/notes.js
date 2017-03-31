import { compose, find, first, includes, isEqual, last, split } from 'lodash/fp';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import { Note } from '../note/note';
import './notes.scss';

const { toolTypes } = shared.constants;
const { showIf } = shared.helpers;

export class Notes extends React.Component {
  static propTypes = {
    measureCount: React.PropTypes.number.isRequired,
    mousePoint: React.PropTypes.object.isRequired,
    notes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onDraw: React.PropTypes.func.isRequired,
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
    isDrawing: false,
    isMoving: false,
    isResizing: false,
  };

  componentDidUpdate(prevProps) {
    const hasNotMoved = isEqual(prevProps.mousePoint, this.props.mousePoint);

    if (hasNotMoved) return;

    this.handleMove(prevProps.mousePoint);
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
      showIf(this.getIsDrawingEnabled())(
        h(Note, {
          className: 'notes__note--ghost',
          isSelected: false,
          note: this.getGhostNoteNote(),
        }),
      ),
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

  getGhostNoteNote() {
    const point = this.props.mousePoint;
    return {
      points: [
        {
          x: point ? point.x : 0,
          y: point ? point.y : 0,
        },
        {
          x: point ? point.x + 1 : 0,
          y: point ? point.y : 0,
        },
      ],
    };
  }

  getIsDrawingEnabled() {
    return this.props.toolType === toolTypes.DRAW;
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

  handleMouseDown = () => {
    const { DRAW } = toolTypes;

    if (this.props.toolType === DRAW) {
      this.startDrawing();
    }
  }

  handleMouseLeave = (e) => {
    const primaryClassName = `.${compose(first, split(' '))(e.target.className)}`;
    const isDescendant = !!this.elementRef.querySelector(primaryClassName);
    if (isDescendant) return;

    if (this.state.isDrawing) {
      this.stopDrawing();
    }

    if (this.state.isMoving) {
      this.stopMoving();
    }

    if (this.state.isResizing) {
      this.stopResizing();
    }
  }

  handleMove = (prevMousePoint) => {
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
    if (this.state.isDrawing) {
      this.props.onDraw(this.props.mousePoint);
      this.stopDrawing();
    }

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

  startDrawing = () => this.setState({
    isDrawing: true,
  });

  startMoving = () => this.setState({
    isMoving: true,
  });

  startResizing = () => this.setState({
    isResizing: true,
  });

  stopDrawing = () => this.setState({
    isDrawing: false,
  });

  stopMoving = () => this.setState({
    isMoving: false,
  });

  stopResizing = () => this.setState({
    isResizing: false,
  });
}
