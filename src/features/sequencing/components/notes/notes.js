import { find, first, includes, isEqual, last } from 'lodash/fp';
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
    onSelectStart: React.PropTypes.func.isRequired,
    onSelectUpdate: React.PropTypes.func.isRequired,
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
    const isOffscreen = this.props.mousePoint.x === -1;

    if (hasNotMoved || isOffscreen) return;

    this.handleMove(prevProps.mousePoint);
  }

  render() {
    return h('.notes', {
      onMouseDown: this.handleMouseDown,
      onMouseLeave: this.handleMouseLeave,
      onMouseMove: this.handleMouseMove,
      onMouseUp: this.handleMouseUp,
      style: this.getStyle(),
    }, [
      showIf(this.getIsDrawing())(
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

  getIsDrawing() {
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

  // handleMouseDown = (e) => {
  //   const { SELECT } = toolTypes;
  //
  //   if (this.props.toolType === SELECT) {
  //     const isAdditive = e.ctrlKey || e.metaKey;
  //     this.props.onSelectStart(isAdditive, this.props.mousePoint);
  //   }
  //
  //   return false;
  // }

  handleMouseLeave = () => {
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

    // else if (this.props.isSelecting) {
    //   const isAdditive = e.ctrlKey || e.metaKey;
    //   this.props.onSelectUpdate(isAdditive, this.props.mousePoint);
    // }
  }

  handleMouseUp = () => {
    if (this.state.isMoving) {
      this.stopMoving();
    }

    if (this.state.isResizing) {
      this.stopResizing();
    }

    if (this.props.toolType === toolTypes.DRAW) {
      this.props.onDraw(this.props.mousePoint);
    }
  }

  handleNoteMouseDown = (note, e) => {
    // const { DRAW, SELECT } = toolTypes;
    //
    // if (this.props.toolType !== DRAW && this.props.toolType !== SELECT
    // ) return true;

    const isAdditive = e.ctrlKey || e.metaKey;
    this.props.onNotePreview(first(note.points));
    if (!includes(note, this.props.selectedNotes)) {
      this.props.onNoteSelect(note, isAdditive);
    }
    this.startMoving();
    e.stopPropagation();
    return false;
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
