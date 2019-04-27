import Dawww from "dawww";
import find from "lodash/fp/find";
import getOr from "lodash/fp/getOr";
import isEqual from "lodash/fp/isEqual";
import max from "lodash/fp/max";
import min from "lodash/fp/min";
import uniqBy from "lodash/fp/uniqBy";
import PropTypes from "prop-types";
import React, { useState } from "react";
import styled from "styled-components/macro";
import { Note } from "../Note/Note";

const StyledNotes = styled.div`
  bottom: 0;
  cursor: pointer;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: ${props => props.measureCount * 4 * 8 * 40}px;
`;

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

export function Notes(props) {
  const [bounds, setBounds] = useState({
    bottom: (Dawww.OCTAVE_RANGE.length * 12 - 1) * 40,
    left: 0,
    right: (props.measureCount * 8 * 4 - 1) * 40,
    top: 0
  });
  const [deltasState, setDeltasState] = useState({});

  const getIsNoteSelected = note =>
    !!find(x => x.id === note.id, props.selectedNotes);

  const handleNoteDrag = ({ deltaX, deltaY }) => {
    const deltaReducer = (acc, cur) => {
      const prevX = getOr(0, `[${cur.id}].x`, acc);
      const prevY = getOr(0, `[${cur.id}].y`, acc);
      const x = prevX + deltaX;
      const y = prevY + deltaY;

      return { ...acc, [cur.id]: { x, y } };
    };
    const newDeltas = props.selectedNotes.reduce(deltaReducer, deltasState);

    if (isEqual(newDeltas, deltasState)) return;

    const adjustedNotes = applyDeltas(props.selectedNotes, newDeltas);

    setDeltasState(newDeltas);

    props.onDragPreview(adjustedNotes);
  };

  const handleNoteDragStart = draggedNote => {
    const notes = uniqBy(x => x.id, [...props.selectedNotes, draggedNote]);
    const draggedX = getOr(0, "points[0].x", draggedNote);
    const draggedY = getOr(0, "points[0].y", draggedNote);
    const maxX = max(notes.map(getOr(0, "points[1].x")));
    const maxY = max(notes.map(getOr(0, "points[1].y")));
    const minX = min(notes.map(getOr(0, "points[0].x")));
    const minY = min(notes.map(getOr(0, "points[0].y")));
    const baseBottom = Dawww.OCTAVE_RANGE.length * 12 - 1;
    const baseRight = props.measureCount * 8 * 4 - 1;

    setBounds({
      bottom: (baseBottom - (maxY - draggedY)) * 40,
      left: (draggedX - minX) * 40,
      right: (baseRight - (maxX - draggedX)) * 40,
      top: (draggedY - minY) * 40
    });
  };

  const handleNoteDragStop = () => {
    props.onDrag(applyDeltas(props.notes, deltasState));
    setDeltasState({});
  };

  return (
    <StyledNotes measureCount={props.measureCount}>
      {applyDeltas(props.notes, deltasState).map(note => (
        <Note
          bounds={bounds}
          className="notes__note"
          isSelected={getIsNoteSelected(note)}
          key={note.id}
          onDrag={handleNoteDrag}
          onDragStart={handleNoteDragStart}
          onDragStop={handleNoteDragStop}
          onErase={props.onErase}
          onResizeStart={() => {}}
          onSelect={props.onSelect}
          toolType={props.toolType}
          note={note}
        />
      ))}
    </StyledNotes>
  );
}

function applyDeltas(notes, deltas) {
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
