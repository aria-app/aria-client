import Dawww from "dawww";
import find from "lodash/fp/find";
import getOr from "lodash/fp/getOr";
import includes from "lodash/fp/includes";
import isEqual from "lodash/fp/isEqual";
import max from "lodash/fp/max";
import min from "lodash/fp/min";
import uniqBy from "lodash/fp/uniqBy";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components/macro";
import * as constants from "../../constants";
import { Note } from "../Note/Note";

const StyledNotes = styled.div(props => ({
  bottom: 0,
  cursor: "pointer",
  left: 0,
  pointerEvents: "none",
  position: "absolute",
  top: 0,
  width: props.measureCount * 4 * 8 * 40
}));

Notes.propTypes = {
  measureCount: PropTypes.number.isRequired,
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDrag: PropTypes.func.isRequired,
  onDragPreview: PropTypes.func.isRequired,
  onErase: PropTypes.func.isRequired,
  onResize: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedNotes: PropTypes.arrayOf(PropTypes.object).isRequired,
  toolType: PropTypes.string.isRequired
};

Notes.defaultProps = {
  selectedNotes: []
};

function Notes(props) {
  const [positionBounds, setPositionBounds] = useState({
    bottom: (Dawww.OCTAVE_RANGE.length * 12 - 1) * 40,
    left: 0,
    right: (props.measureCount * 8 * 4 - 1) * 40,
    top: 0
  });
  const [sizeBounds, setSizeBounds] = useState({
    left: 0,
    right: (props.measureCount * 8 * 4 - 1) * 40
  });
  const [positionDeltas, setPositionDeltas] = useState({});
  const [sizeDeltas, setSizeDeltas] = useState({});

  const getIsNoteSelected = note =>
    !!find(x => x.id === note.id, props.selectedNotes);

  const getIsEraseEnabled = () => props.toolType === constants.toolTypes.ERASE;

  const getIsSelectEnabled = () =>
    includes(props.toolType, [
      constants.toolTypes.DRAW,
      constants.toolTypes.SELECT
    ]);

  const erase = note => {
    if (!getIsEraseEnabled()) return;

    props.onErase(note);
  };

  const handleNoteDrag = ({ deltaX, deltaY }) => {
    const deltaReducer = (acc, cur) => {
      const prevX = getOr(0, `[${cur.id}].x`, acc);
      const prevY = getOr(0, `[${cur.id}].y`, acc);
      const x = prevX + deltaX;
      const y = prevY + deltaY;

      return { ...acc, [cur.id]: { x, y } };
    };
    const newDeltas = props.selectedNotes.reduce(deltaReducer, positionDeltas);

    if (isEqual(newDeltas, positionDeltas)) return;

    const adjustedNotes = applyPositionDeltas(props.selectedNotes, newDeltas);

    setPositionDeltas(newDeltas);

    props.onDragPreview(adjustedNotes);
  };

  const handleNoteDragStart = (draggedNote, e) => {
    const notes = uniqBy(x => x.id, [draggedNote, ...props.selectedNotes]);
    const draggedX = getOr(0, "points[0].x", draggedNote);
    const draggedY = getOr(0, "points[0].y", draggedNote);
    const maxX = max(notes.map(getOr(0, "points[1].x")));
    const maxY = max(notes.map(getOr(0, "points[1].y")));
    const minX = min(notes.map(getOr(0, "points[0].x")));
    const minY = min(notes.map(getOr(0, "points[0].y")));
    const baseBottom = Dawww.OCTAVE_RANGE.length * 12 - 1;
    const baseRight = props.measureCount * 8 * 4 - 1;

    setPositionBounds({
      bottom: (baseBottom - (maxY - draggedY)) * 40,
      left: (draggedX - minX) * 40,
      right: (baseRight - (maxX - draggedX)) * 40,
      top: (draggedY - minY) * 40
    });

    erase(draggedNote);

    select(draggedNote, e);
  };

  const handleNoteDragStop = () => {
    props.onDrag(applyPositionDeltas(props.notes, positionDeltas));
    setPositionDeltas({});
  };

  const handleNoteEndPointDrag = ({ deltaX }) => {
    const deltaReducer = (acc, cur) => {
      const prevX = getOr(0, `[${cur.id}].x`, acc);
      const x = prevX + deltaX;

      return { ...acc, [cur.id]: { x } };
    };
    const newDeltas = props.selectedNotes.reduce(deltaReducer, sizeDeltas);

    if (isEqual(newDeltas, sizeDeltas)) return;

    setSizeDeltas(newDeltas);
  };

  const handleNoteEndPointDragStart = (sizedNote, e) => {
    const notes = uniqBy(x => x.id, [...props.selectedNotes, sizedNote]);
    const maxPositionX = max(notes.map(getOr(0, "points[0].x")));
    const baseRight = props.measureCount * 8 * 4 - 1;

    setSizeBounds({
      left: 40,
      right: (baseRight - maxPositionX) * 40
    });

    select(sizedNote, e);
  };

  const handleNoteEndPointDragStop = () => {
    props.onResize(applySizeDeltas(props.notes, sizeDeltas));
    setSizeDeltas({});
  };

  const adjustedNotes = applySizeDeltas(
    applyPositionDeltas(props.notes, positionDeltas),
    sizeDeltas
  );

  function select(note, e) {
    const isAdditive = e.ctrlKey || e.metaKey;

    if (!getIsSelectEnabled() || (props.isSelected && !isAdditive)) return;

    props.onSelect(note, isAdditive);
  }

  return (
    <StyledNotes measureCount={props.measureCount}>
      {adjustedNotes.map(note => (
        <Note
          className="notes__note"
          isSelected={getIsNoteSelected(note)}
          key={note.id}
          onDrag={handleNoteDrag}
          onDragStart={handleNoteDragStart}
          onDragStop={handleNoteDragStop}
          onEndPointDrag={handleNoteEndPointDrag}
          onEndPointDragStart={handleNoteEndPointDragStart}
          onEndPointDragStop={handleNoteEndPointDragStop}
          onSelect={props.onSelect}
          positionBounds={positionBounds}
          sizeBounds={sizeBounds}
          toolType={props.toolType}
          note={note}
        />
      ))}
    </StyledNotes>
  );
}

export default React.memo(Notes);

function applyPositionDeltas(notes, deltas) {
  return notes.map(note => {
    const noteDelta = deltas[note.id];

    if (!noteDelta) return note;

    return {
      ...note,
      points: note.points.map(point => ({
        x: point.x + noteDelta.x,
        y: point.y + noteDelta.y
      }))
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
          y: note.points[1].y
        }
      ]
    };
  });
}
