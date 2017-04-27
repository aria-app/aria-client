import compose from 'lodash/fp/compose';
import find from 'lodash/fp/find';
import first from 'lodash/fp/first';
import get from 'lodash/fp/get';
import includes from 'lodash/fp/includes';
import isEmpty from 'lodash/fp/isEmpty';
import isEqual from 'lodash/fp/isEqual';
import last from 'lodash/fp/last';
import map from 'lodash/fp/map';
import some from 'lodash/fp/some';
import React from 'react';
import h from 'react-hyperscript';
import keydown from 'react-keydown';
import shared from '../../../shared';
import song from '../../../song';
import { Note } from '../note/note';
import './notes.scss';

const { toolTypes } = shared.constants;
const { someNoteWillMoveOutside } = song.helpers;

export class Notes extends React.Component {
  static propTypes = {
    measureCount: React.PropTypes.number.isRequired,
    mousePoint: React.PropTypes.object.isRequired,
    notes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onDeselectAll: React.PropTypes.func.isRequired,
    onDrag: React.PropTypes.func.isRequired,
    onDuplicate: React.PropTypes.func.isRequired,
    onErase: React.PropTypes.func.isRequired,
    onNudge: React.PropTypes.func.isRequired,
    onResize: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    onSelectAll: React.PropTypes.func.isRequired,
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
      tabIndex: '0',
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

  @keydown('backspace', 'del')
  delete(e) {
    e.preventDefault();

    if (isEmpty(this.props.selectedNotes)) return;

    this.props.onDelete({
      ids: map(get('id'), this.props.selectedNotes),
    });
  }

  @keydown('ctrl+d', 'meta+d')
  deselectAll(e) {
    e.preventDefault();

    if (isEmpty(this.props.selectedNotes)) return;

    this.props.onDeselectAll();
  }

  @keydown('ctrl+shift+d', 'meta+shift+d')
  duplicate(e) {
    e.preventDefault();

    if (isEmpty(this.props.selectedNotes)) return;

    this.props.onDuplicate({
      notes: song.helpers.duplicateNotes(this.props.selectedNotes),
    });
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
    if (includes('note', e.target.className)) return;

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
      this.props.onDrag({
        notes: this.props.selectedNotes,
        delta,
      });
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

  nudge = (e, delta) => {
    e.preventDefault();

    if (isEmpty(this.props.selectedNotes)) return;

    if (someNoteWillMoveOutside(
      this.props.measureCount,
      delta,
      this.props.selectedNotes,
    )) return;

    this.props.onNudge({
      ids: map(get('id'), this.props.selectedNotes),
      delta,
    });
  }

  @keydown('down');
  nudgeDown(e) {
    this.nudge(e, { x: 0, y: 1 });
  }

  @keydown('left');
  nudgeLeft(e) {
    this.nudge(e, { x: -1, y: 0 });
  }

  @keydown('right');
  nudgeRight(e) {
    this.nudge(e, { x: 1, y: 0 });
  }

  @keydown('up');
  nudgeUp(e) {
    this.nudge(e, { x: 0, y: -1 });
  }

  @keydown('ctrl+a', 'meta+a')
  selectAll() {
    if (this.props.notes.length === this.props.selectedNotes.length) return;

    this.props.onSelectAll({
      ids: map(get('id'), this.props.notes),
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
