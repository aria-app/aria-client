import find from "lodash/fp/find";
import PropTypes from "prop-types";
import React, { useCallback, useState } from "react";
import styled from "styled-components/macro";
import { Note } from "../Note/Note";

const StyledNotes = styled.div`
  bottom: 0;
  cursor: pointer;
  left: 0;
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
  const [notes, setNotes] = useState(props.notes);
  const handleNoteDrag = useCallback(
    (note, e, dragData) => {
      console.log("dragData", dragData);
      setNotes(
        notes.map(n => {
          if (n.id !== note.id) {
            return n;
          }

          return {
            ...n,
            points: n.points.map(p => ({
              x: p.x + dragData.deltaX / 40,
              y: p.y + dragData.deltaY / 40
            }))
          };
        })
      );
    },
    [notes]
  );

  const getIsNoteSelected = note =>
    !!find(x => x.id === note.id, props.selectedNotes);

  return (
    <StyledNotes measureCount={props.measureCount}>
      {notes.map(note => (
        <Note
          className="notes__note"
          isSelected={getIsNoteSelected(note)}
          key={note.id}
          onDrag={handleNoteDrag}
          onErase={props.onErase}
          onMoveStart={() => {}}
          onResizeStart={() => {}}
          onSelect={props.onSelect}
          toolType={props.toolType}
          note={note}
        />
      ))}
    </StyledNotes>
  );
}
