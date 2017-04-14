import compose from 'lodash/fp/compose';
import find from 'lodash/fp/find';
import first from 'lodash/fp/first';
import get from 'lodash/fp/get';
import includes from 'lodash/fp/includes';
import isEqual from 'lodash/fp/isEqual';
import last from 'lodash/fp/last';
import map from 'lodash/fp/map';
import some from 'lodash/fp/some';
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
    onResize: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
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
      onMouseLeave: this.handleMouseLeave,
      onMouseUp: this.handleMouseUp,
      style: this.getStyle(),
    }, [
      ...this.props.notes.map(note => h(Note, {
        className: 'notes__note',
        key: note.id,
        isEraseEnabled: this.getIsNoteEraseEnabled(),
        isSelected: this.getIsNoteSelected(note),
        isSelectEnabled: this.getIsNoteSelectEnabled(),
        onErase: this.handleNoteErase,
        onMoveStart: this.handleNoteMoveStart,
        onResizeStart: this.handleNoteResizeStart,
        onSelect: this.handleNoteSelect,
        note,
      })),
    ]);
  }

  getIsNoteSelected(note) {
    return !!find({
      id: note.id,
    })(this.props.selectedNotes);
  }

  getIsNoteEraseEnabled = () => includes(this.props.toolType)([
    toolTypes.ERASE,
  ]);

  getIsNoteSelectEnabled = () => includes(this.props.toolType)([
    toolTypes.DRAW,
    toolTypes.SELECT,
  ]);

  getStyle() {
    return {
      width: this.props.measureCount * 4 * 8 * 40,
    };
  }

  handleMouseLeave = (e) => {
    if (includes('note')(e.target.className)) return;

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
      this.handleResize(delta);
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

  handleNoteErase = note =>
    this.props.onErase(note);

  handleNoteMoveStart = () =>
    this.setState({
      isMoving: true,
    });

  handleNoteResizeStart = () =>
    this.setState({
      isResizing: true,
    });

  handleNoteSelect = (...args) =>
    this.props.onSelect(...args);

  handleResize = (delta) => {
    const isMovingLeft = delta.x < 0;

    const pointSets = map(get('points'), this.props.selectedNotes);

    const isAnyNoteBent = some(
      points => last(points).y - first(points).y !== 0,
    )(pointSets);

    const willAnyBeMinLength = some(
      points => (last(points).x - first(points).x) <= 1,
    )(pointSets);

    const willAnyBeNegative = some(
      points => (last(points).x - first(points).x) <= 0,
    )(pointSets);

    const willAnyBeVertical = (
      delta.y !== 0 &&
      some(n => (last(n.points).x - first(n.points).x) === 0)(this.props.selectedNotes)
    );

    const willGoOutside = compose(
      getIsSomePointOutside(this.props.measureCount),
      map(compose(addPoints(delta), last)),
    )(pointSets);

    const isResizeInvalid = (
      (isMovingLeft && isAnyNoteBent && willAnyBeMinLength) ||
      (isMovingLeft && willAnyBeNegative) ||
      willAnyBeVertical ||
      willGoOutside
    );

    if (isResizeInvalid) return;

    this.props.onResize({
      notes: this.props.selectedNotes,
      delta,
    });
  }

  stopMoving = () => this.setState({
    isMoving: false,
  });

  stopResizing = () => this.setState({
    isResizing: false,
  });
}

function addPoints(b) {
  return a => ({
    x: a.x + b.x,
    y: a.y + b.y,
  });
}

function getIsSomePointOutside(measureCount) {
  return some(point =>
    point.x < 0 ||
    point.x > ((measureCount * 8) * 4) - 1 ||
    point.y < 0 ||
    point.y > (shared.constants.octaveRange.length * 12) - 1,
  );
}
