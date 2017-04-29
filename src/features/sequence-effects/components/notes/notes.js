import compose from 'lodash/fp/compose';
import first from 'lodash/fp/first';
import get from 'lodash/fp/get';
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

const { addPoints, resizeNote, translateNote } = song.helpers;

export class Notes extends React.PureComponent {
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
    dragDelta: { x: 0, y: 0 },
    resizeDelta: { x: 0, y: 0 },
    isDragging: false,
    isResizing: false,
  };

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
        onErase: this.handleNoteErase,
        onMoveStart: this.handleNoteMoveStart,
        onResizeStart: this.handleNoteResizeStart,
        onSelect: this.handleNoteSelect,
        selectedNotes: this.props.selectedNotes,
        toolType: this.props.toolType,
        note,
      })),
    ]);
  }

  applyTransforms = notes => map(compose(
    resizeNote(this.state.resizeDelta),
    translateNote(this.state.dragDelta),
  ))(notes);

  dragStagedNotes = (delta) => {
    if (song.helpers.someNoteWillMoveOutside(
      this.props.measureCount,
      delta,
      this.getSelectedNotes(),
    )) return;

    this.setState(state => ({
      dragDelta: addPoints(delta, state.dragDelta),
    }));
  };

  getNotes = () =>
    this.applyTransforms(this.props.notes);

  getSelectedNotes = () =>
    this.applyTransforms(this.props.selectedNotes);

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
    this.props.onErase({ note });

  handleNoteMoveStart = () =>
    this.setState(() => ({
      dragDelta: { x: 0, y: 0 },
      isDragging: true,
    }));

  handleNoteResizeStart = () =>
    this.setState(() => ({
      isResizing: true,
      resizeDelta: { x: 0, y: 0 },
    }));

  handleNoteSelect = (isAdditive, note) =>
    this.props.onSelect({
      isAdditive,
      note,
    });

  handleResize = (delta) => {
    const isDraggingLeft = delta.x < 0;
    const pointSets = map(get('points'), this.getSelectedNotes());
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
      some(n => (last(n.points).x - first(n.points).x) === 0, this.getSelectedNotes())
    );

    const willGoOutside = compose(
      getIsSomePointOutside(this.props.measureCount),
      map(resizeNote(delta)),
    )(this.getSelectedNotes());

    if (
      (isDraggingLeft && isAnyNoteBent && willAnyBeMinLength) ||
      (isDraggingLeft && willAnyBeNegative) ||
      willAnyBeVertical ||
      willGoOutside
    ) return;

    this.resizeStagedNotes(delta);
  }

  resizeStagedNotes = delta =>
    this.setState(state => ({
      resizeDelta: addPoints(delta, state.resizeDelta),
    }));

  stopDragging = () => {
    this.props.onDrag({ notes: this.getSelectedNotes() });
    this.setState({
      dragDelta: { x: 0, y: 0 },
      isDragging: false,
    });
  };

  stopResizing = () => {
    this.props.onResize({ notes: this.getSelectedNotes() });
    this.setState({
      isResizing: false,
      resizeDelta: { x: 0, y: 0 },
    });
  };
}

function getIsSomePointOutside(measureCount) {
  return some(point =>
    point.x < 0 ||
    point.x > ((measureCount * 8) * 4) - 1 ||
    point.y < 0 ||
    point.y > (shared.constants.octaveRange.length * 12) - 1,
  );
}
