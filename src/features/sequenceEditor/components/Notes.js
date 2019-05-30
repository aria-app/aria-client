import Dawww from 'dawww';
import find from 'lodash/fp/find';
import getOr from 'lodash/fp/getOr';
import includes from 'lodash/fp/includes';
import isEqual from 'lodash/fp/isEqual';
import max from 'lodash/fp/max';
import min from 'lodash/fp/min';
import uniqBy from 'lodash/fp/uniqBy';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import * as constants from '../constants';
import Note from './Note';

const StyledNotes = styled('div')(props => ({
  bottom: 0,
  cursor: 'pointer',
  left: 0,
  pointerEvents: 'none',
  position: 'absolute',
  top: 0,
  width: props.measureCount * 4 * 8 * 40,
}));

export default class Notes extends React.Component {
  static propTypes = {
    measureCount: PropTypes.number,
    notes: PropTypes.arrayOf(PropTypes.object),
    onDrag: PropTypes.func,
    onDragPreview: PropTypes.func,
    onErase: PropTypes.func,
    onResize: PropTypes.func,
    onSelect: PropTypes.func,
    selectedNotes: PropTypes.arrayOf(PropTypes.object),
    toolType: PropTypes.string,
  };

  static defaultProps = {
    selectedNotes: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      positionBounds: {
        bottom: (Dawww.OCTAVE_RANGE.length * 12 - 1) * 40,
        left: 0,
        right: (props.measureCount * 8 * 4 - 1) * 40,
        top: 0,
      },
      positionDeltas: {},
      sizeBounds: {
        left: 0,
        right: (props.measureCount * 8 * 4 - 1) * 40,
      },
      sizeDeltas: {},
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(isEqual(this.props, nextProps) && isEqual(this.state, nextState));
  }

  render() {
    return (
      <StyledNotes measureCount={this.props.measureCount}>
        {this.getAdjustedNotes().map(note => (
          <Note
            className="notes__note"
            isSelected={this.getIsNoteSelected(note)}
            key={note.id}
            onDrag={this.handleNoteDrag}
            onDragStart={this.handleNoteDragStart}
            onDragStop={this.handleNoteDragStop}
            onEndPointDrag={this.handleNoteEndPointDrag}
            onEndPointDragStart={this.handleNoteEndPointDragStart}
            onEndPointDragStop={this.handleNoteEndPointDragStop}
            onSelect={this.props.onSelect}
            positionBounds={this.state.positionBounds}
            sizeBounds={this.state.sizeBounds}
            toolType={this.props.toolType}
            note={note}
          />
        ))}
      </StyledNotes>
    );
  }

  getAdjustedNotes = () =>
    applySizeDeltas(
      applyPositionDeltas(this.props.notes, this.state.positionDeltas),
      this.state.sizeDeltas,
    );

  getIsNoteSelected = note =>
    !!find(x => x.id === note.id, this.props.selectedNotes);

  getIsEraseEnabled = () => this.props.toolType === constants.toolTypes.ERASE;

  getIsSelectEnabled = () =>
    includes(this.props.toolType, [
      constants.toolTypes.DRAW,
      constants.toolTypes.SELECT,
    ]);

  erase = note => {
    if (!this.getIsEraseEnabled()) return;

    this.props.onErase(note);
  };

  handleNoteDrag = ({ deltaX, deltaY }) => {
    const deltaReducer = (acc, cur) => {
      const prevX = getOr(0, `[${cur.id}].x`, acc);
      const prevY = getOr(0, `[${cur.id}].y`, acc);
      const x = prevX + deltaX;
      const y = prevY + deltaY;

      return { ...acc, [cur.id]: { x, y } };
    };
    const newDeltas = this.props.selectedNotes.reduce(
      deltaReducer,
      this.state.positionDeltas,
    );

    if (isEqual(newDeltas, this.state.positionDeltas)) return;

    const adjustedNotes = applyPositionDeltas(
      this.props.selectedNotes,
      newDeltas,
    );

    this.setState({
      positionDeltas: newDeltas,
    });

    this.props.onDragPreview(adjustedNotes);
  };

  handleNoteDragStart = (draggedNote, e) => {
    const notes = uniqBy(x => x.id, [draggedNote, ...this.props.selectedNotes]);
    const draggedX = getOr(0, 'points[0].x', draggedNote);
    const draggedY = getOr(0, 'points[0].y', draggedNote);
    const maxX = max(notes.map(getOr(0, 'points[1].x')));
    const maxY = max(notes.map(getOr(0, 'points[1].y')));
    const minX = min(notes.map(getOr(0, 'points[0].x')));
    const minY = min(notes.map(getOr(0, 'points[0].y')));
    const baseBottom = Dawww.OCTAVE_RANGE.length * 12 - 1;
    const baseRight = this.props.measureCount * 8 * 4 - 1;

    this.setState({
      positionBounds: {
        bottom: (baseBottom - (maxY - draggedY)) * 40,
        left: (draggedX - minX) * 40,
        right: (baseRight - (maxX - draggedX)) * 40,
        top: (draggedY - minY) * 40,
      },
    });

    this.erase(draggedNote);

    this.select(draggedNote, e);
  };

  handleNoteDragStop = () => {
    const draggedNotes = applyPositionDeltas(
      this.props.notes,
      this.state.positionDeltas,
    );

    if (!isEqual(draggedNotes, this.props.notes)) {
      this.props.onDrag(draggedNotes);
    }

    this.setState({
      positionDeltas: {},
    });
  };

  handleNoteEndPointDrag = ({ deltaX }) => {
    const deltaReducer = (acc, cur) => {
      const prevX = getOr(0, `[${cur.id}].x`, acc);
      const x = prevX + deltaX;

      return { ...acc, [cur.id]: { x } };
    };
    const newDeltas = this.props.selectedNotes.reduce(
      deltaReducer,
      this.state.sizeDeltas,
    );

    if (isEqual(newDeltas, this.state.sizeDeltas)) return;

    this.setState({
      sizeDeltas: newDeltas,
    });
  };

  handleNoteEndPointDragStart = (sizedNote, e) => {
    const notes = uniqBy(x => x.id, [...this.props.selectedNotes, sizedNote]);
    const maxPositionX = max(notes.map(getOr(0, 'points[0].x')));
    const baseRight = this.props.measureCount * 8 * 4 - 1;

    this.setState({
      sizeBounds: {
        left: 40,
        right: (baseRight - maxPositionX) * 40,
      },
    });

    this.select(sizedNote, e);
  };

  handleNoteEndPointDragStop = () => {
    this.props.onResize(
      applySizeDeltas(this.props.notes, this.state.sizeDeltas),
    );

    this.setState({
      sizeDeltas: {},
    });
  };

  select = (note, e) => {
    const isAdditive = e.ctrlKey || e.metaKey;

    if (
      !this.getIsSelectEnabled() ||
      (this.getIsNoteSelected(note) && !isAdditive)
    )
      return;

    this.props.onSelect(note, isAdditive);
  };
}

function applyPositionDeltas(notes, deltas) {
  return notes.map(note => {
    const noteDelta = deltas[note.id];

    if (!noteDelta) return note;

    return {
      ...note,
      points: note.points.map(point => ({
        x: point.x + noteDelta.x,
        y: point.y + noteDelta.y,
      })),
    };
  });
}

function applySizeDeltas(notes, deltas) {
  return notes.map(note => {
    const noteDelta = deltas[note.id];

    if (!noteDelta) return note;

    return {
      ...note,
      points: [
        note.points[0],
        {
          x: note.points[1].x + noteDelta.x,
          y: note.points[1].y,
        },
      ],
    };
  });
}
