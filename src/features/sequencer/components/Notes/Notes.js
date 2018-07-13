import Dawww from 'dawww';
import compose from 'lodash/fp/compose';
import first from 'lodash/fp/first';
import get from 'lodash/fp/get';
import isEqual from 'lodash/fp/isEqual';
import last from 'lodash/fp/last';
import map from 'lodash/fp/map';
import some from 'lodash/fp/some';
import without from 'lodash/fp/without';
import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import { Note } from '../Note/Note';
import './Notes.scss';

export class Notes extends React.PureComponent {
  static propTypes = {
    measureCount: PropTypes.number.isRequired,
    mousePoint: PropTypes.object.isRequired,
    notes: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDrag: PropTypes.func.isRequired,
    onErase: PropTypes.func.isRequired,
    onResize: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    selectedNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
    toolType: PropTypes.string.isRequired,
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
      ...this.getNotes().map(note =>
        h(Note, {
          className: 'notes__note',
          key: note.id,
          onErase: this.props.onErase,
          onMoveStart: this.handleNoteMoveStart,
          onResizeStart: this.handleNoteResizeStart,
          onSelect: this.props.onSelect,
          selectedNotes: this.props.selectedNotes,
          toolType: this.props.toolType,
          note,
        }),
      ),
    ]);
  }

  applyTransforms = notes => map(compose(
    Dawww.resizeNote(this.state.resizeDelta),
    Dawww.translateNote(this.state.dragDelta),
  ))(notes);

  getNotes = () => [
    ...this.applyTransforms(this.props.selectedNotes),
    ...without(this.props.selectedNotes, this.props.notes),
  ];

  getTransformedSelectedNotes = () =>
    this.applyTransforms(this.props.selectedNotes);

  getStyle() {
    return {
      width: this.props.measureCount * 4 * 8 * 40,
    };
  }

  handleMousePointChange = (prevMousePoint) => {
    const delta = Dawww.getPointOffset(
      prevMousePoint,
      this.props.mousePoint,
    );


    if (this.state.isDragging) {
      this.updateDragDelta(delta);
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

  handleNoteMoveStart = () =>
    this.setState(() => ({
      isDragging: true,
    }));

  handleNoteResizeStart = () =>
    this.setState(() => ({
      isResizing: true,
    }));

  handleResize = (delta) => {
    const isDraggingLeft = delta.x < 0;
    const pointSets = map(get('points'), this.getTransformedSelectedNotes());
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
      some(n => (last(n.points).x - first(n.points).x) === 0, this.getTransformedSelectedNotes())
    );

    const willGoOutside = compose(
      getIsSomePointOutside(this.props.measureCount),
      map(Dawww.resizeNote(delta)),
    )(this.getTransformedSelectedNotes());

    // Leaving this in place to disable bending until it is
    // reimplemented in Dawww.
    if (delta.y !== 0) return;

    if (
      (isDraggingLeft && isAnyNoteBent && willAnyBeMinLength) ||
      (isDraggingLeft && willAnyBeNegative) ||
      willAnyBeVertical ||
      willGoOutside
    ) return;

    this.updateResizeDelta(delta);
  }

  stopDragging = () => {
    if (isEqual({ x: 0, y: 0 }, this.state.dragDelta)) {
      this.setState({
        isDragging: false,
      });
      return;
    }

    this.props.onDrag(this.getTransformedSelectedNotes());

    this.setState({
      dragDelta: { x: 0, y: 0 },
      isDragging: false,
    });
  };

  stopResizing = () => {
    if (isEqual({ x: 0, y: 0 }, this.state.resizeDelta)) {
      this.setState({
        isResizing: false,
      });
      return;
    }

    this.props.onResize(this.getTransformedSelectedNotes());

    this.setState({
      isResizing: false,
      resizeDelta: { x: 0, y: 0 },
    });
  };

  updateDragDelta = (delta) => {
    if (Dawww.someNoteWillMoveOutside(
      this.props.measureCount,
      delta,
      this.getTransformedSelectedNotes(),
    )) return;

    this.setState(state => ({
      dragDelta: Dawww.addPoints(delta, state.dragDelta),
    }));
  };

  updateResizeDelta = delta =>
    this.setState(state => ({
      resizeDelta: Dawww.addPoints(delta, state.resizeDelta),
    }));
}

function getIsSomePointOutside(measureCount) {
  return some(point =>
    point.x < 0 ||
    point.x > ((measureCount * 8) * 4) - 1 ||
    point.y < 0 ||
    point.y > (Dawww.OCTAVE_RANGE.length * 12) - 1,
  );
}
