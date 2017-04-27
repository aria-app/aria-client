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
import song from '../../../song';
import { Note } from '../note/note';
import './notes.scss';

export class Notes extends React.Component {
  static propTypes = {
    measureCount: React.PropTypes.number.isRequired,
    mousePoint: React.PropTypes.object.isRequired,
    notes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onDrag: React.PropTypes.func.isRequired,
    onErase: React.PropTypes.func.isRequired,
    onResize: React.PropTypes.func.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    selectedNotes: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    toolType: React.PropTypes.string.isRequired,
  }

  state = {
    isDragging: false,
    isResizing: false,
    stagedNotes: [],
  };

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.selectedNotes, nextProps.selectedNotes)) {
      this.setState({
        stagedNotes: nextProps.selectedNotes,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.mousePoint, this.props.mousePoint)) {
      this.handleMousePointChange(prevProps.mousePoint);
    }
  }

  render() {
    return h('.notes', {
      onMouseUp: this.handleMouseUp,
      style: this.getStyle(),
    }, [
      ...this.getNotes().map(note => h(Note, {
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

  dragStagedNotes = (delta) => {
    if (song.helpers.someNoteWillMoveOutside(
      this.props.measureCount,
      delta,
      this.state.stagedNotes,
    )) return;

    this.setState(state => ({
      stagedNotes: map(note => ({
        ...note,
        points: note.points.map(addPoints(delta)),
      }), state.stagedNotes),
    }));
  };

  getIsNoteSelected(note) {
    return !!find({
      id: note.id,
    })(this.props.selectedNotes);
  }

  getIsNoteEraseEnabled = () =>
    includes(this.props.toolType, [
      shared.constants.toolTypes.ERASE,
    ]);

  getIsNoteSelectEnabled = () =>
    includes(this.props.toolType, [
      shared.constants.toolTypes.DRAW,
      shared.constants.toolTypes.SELECT,
    ]);

  getNotes = () =>
    this.props.notes.map(note => find({
      id: note.id,
    }, this.state.stagedNotes) || note);

  getStyle() {
    return {
      width: this.props.measureCount * 4 * 8 * 40,
    };
  }

  handleMousePointChange = (prevMousePoint) => {
    const delta = shared.helpers.getPointOffset(
      prevMousePoint,
      this.props.mousePoint,
    );


    if (this.state.isDragging) {
      this.dragStagedNotes(delta);
    } else if (this.state.isResizing) {
      this.handleResize(delta);
    }
  }

  handleMouseUp = () => {
    if (this.state.isDragging) {
      this.stopDragging();
    }

    if (this.state.isResizing) {
      this.stopResizing();
    }
  }

  handleNoteErase = note =>
    this.props.onErase(note);

  handleNoteMoveStart = () =>
    this.setState(() => ({
      isDragging: true,
    }));

  handleNoteResizeStart = () =>
    this.setState(() => ({
      isResizing: true,
    }));


  handleNoteSelect = (...args) =>
    this.props.onSelect(...args);

  handleResize = (delta) => {
    const isDraggingLeft = delta.x < 0;
    const pointSets = map(get('points'), this.state.stagedNotes);
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
      some(n => (last(n.points).x - first(n.points).x) === 0)(this.state.stagedNotes)
    );

    const willGoOutside = compose(
      getIsSomePointOutside(this.props.measureCount),
      map(compose(addPoints(delta), last)),
    )(pointSets);

    const isResizeInvalid = (
      (isDraggingLeft && isAnyNoteBent && willAnyBeMinLength) ||
      (isDraggingLeft && willAnyBeNegative) ||
      willAnyBeVertical ||
      willGoOutside
    );

    if (isResizeInvalid) return;

    this.resizeStagedNotes(delta);
  }

  resizeStagedNotes = delta =>
    this.setState(state => ({
      stagedNotes: map(note => ({
        ...note,
        points: [
          ...note.points.slice(0, note.points.length - 1),
          addPoints(delta)(last(note.points)),
        ],
      }), state.stagedNotes),
    }));

  stopDragging = () => {
    this.props.onDrag({ notes: this.state.stagedNotes });
    this.setState({ isDragging: false });
  };

  stopResizing = () => {
    this.props.onResize({ notes: this.state.stagedNotes });
    this.setState({ isResizing: false });
  };
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
