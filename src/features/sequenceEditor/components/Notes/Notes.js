// import Dawww from "dawww";
import find from "lodash/fp/find";
import getOr from "lodash/fp/getOr";
// import includes from "lodash/fp/includes";
// import isEmpty from "lodash/fp/isEmpty";
// import some from "lodash/fp/some";
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
  const [deltaState, setDeltaState] = useState({});

  const getIsNoteSelected = note =>
    !!find(x => x.id === note.id, props.selectedNotes);

  const getNotesWithDeltas = deltas =>
    props.notes.map(note => {
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

  const handleNoteDrag = (note, e, dragData) => {
    const newDeltas = props.selectedNotes.reduce((acc, cur) => {
      const prevX = getOr(0, `[${cur.id}].x`, acc);
      const prevY = getOr(0, `[${cur.id}].y`, acc);
      const x = prevX + dragData.deltaX / 40;
      const y = prevY + dragData.deltaY / 40;

      return { ...acc, [cur.id]: { x, y } };
    }, deltaState);

    setDeltaState(newDeltas);

    props.onDragPreview(
      getNotesWithDeltas(newDeltas).filter(getIsNoteSelected)
    );
  };

  const handleNoteDragStop = () => {
    props.onDrag(getNotesWithDeltas(deltaState));
    setDeltaState({});
  };

  return (
    <StyledNotes measureCount={props.measureCount}>
      {getNotesWithDeltas(deltaState).map(note => (
        <Note
          className="notes__note"
          isSelected={getIsNoteSelected(note)}
          key={note.id}
          onDrag={handleNoteDrag}
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

// function getIsSomePointOutside(measureCount) {
//   const width = measureCount * 8 * 4 - 1;
//   const height = Dawww.OCTAVE_RANGE.length * 12 - 1;

//   return some(
//     point => point.x < 0 || point.x > width || point.y < 0 || point.y > height
//   );
// }
