import find from 'lodash/fp/find';
import getOr from 'lodash/fp/getOr';
import includes from 'lodash/fp/includes';
import isEqual from 'lodash/fp/isEqual';
import max from 'lodash/fp/max';
import min from 'lodash/fp/min';
import uniqBy from 'lodash/fp/uniqBy';
import createStyles from '@material-ui/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import React from 'react';
import Dawww from '../../../dawww';
import { INote } from '../../shared/types';
import * as constants from '../constants';
import Note from './Note';

const styles = createStyles({
  root: {
    bottom: 0,
    cursor: 'pointer',
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
  },
});

export interface NotesProps extends WithStyles<typeof styles> {
  measureCount?: number;
  notes?: Array<INote>;
  onDrag?: (notes: Array<INote>) => void;
  onDragPreview?: (notes: Array<INote>) => void;
  onErase?: (note: INote) => void;
  onResize?: (resizedNotes: Array<INote>) => void;
  onSelect?: (note: INote, isAdditive: boolean) => void;
  selectedNotes?: Array<INote>;
  toolType?: string;
}

function Notes(props: NotesProps) {
  const {
    classes,
    measureCount,
    notes,
    onDrag,
    onDragPreview,
    onErase,
    onResize,
    onSelect,
    selectedNotes = [],
    toolType,
  } = props;
  const [positionBounds, setPositionBounds] = React.useState({
    bottom: (Dawww.OCTAVE_RANGE.length * 12 - 1) * 40,
    left: 0,
    right: (measureCount * 8 * 4 - 1) * 40,
    top: 0,
  });
  const [positionDeltas, setPositionDeltas] = React.useState({});
  const [sizeBounds, setSizeBounds] = React.useState({
    bottom: undefined,
    left: 0,
    right: (measureCount * 8 * 4 - 1) * 40,
    top: undefined,
  });
  const [sizeDeltas, setSizeDeltas] = React.useState({});

  const adjustedNotes = React.useMemo(
    () =>
      applySizeDeltas(applyPositionDeltas(notes, positionDeltas), sizeDeltas),
    [notes, positionDeltas, sizeDeltas],
  );

  const getIsNoteSelected = React.useCallback(
    note => !!find(x => x.id === note.id, selectedNotes),
    [selectedNotes],
  );

  const handleErase = React.useCallback(
    note => {
      if (toolType !== constants.toolTypes.ERASE) return;

      onErase(note);
    },
    [onErase, toolType],
  );

  const handleNoteDrag = React.useCallback(
    ({ x, y }) => {
      const deltaReducer = (acc, cur) => {
        const prevX = getOr(0, `[${cur.id}].x`, acc);
        const prevY = getOr(0, `[${cur.id}].y`, acc);
        const newX = prevX + x;
        const newY = prevY + y;

        return { ...acc, [cur.id]: { x: newX, y: newY } };
      };
      const newDeltas = selectedNotes.reduce(deltaReducer, positionDeltas);

      if (isEqual(newDeltas, positionDeltas)) return;

      const adjustedNotes = applyPositionDeltas(selectedNotes, newDeltas);

      setPositionDeltas(newDeltas);

      onDragPreview(adjustedNotes);
    },
    [onDragPreview, positionDeltas, selectedNotes],
  );

  const handleSelect = React.useCallback(
    (note, e) => {
      const isAdditive = e.ctrlKey || e.metaKey;

      if (
        !includes(toolType, [
          constants.toolTypes.DRAW,
          constants.toolTypes.SELECT,
        ]) ||
        (getIsNoteSelected(note) && !isAdditive)
      )
        return;

      onSelect(note, isAdditive);
    },
    [getIsNoteSelected, onSelect, toolType],
  );

  const handleNoteDragStart = React.useCallback(
    (draggedNote, e) => {
      const notes = uniqBy(x => x.id, [draggedNote, ...selectedNotes]);
      const draggedX = getOr(0, 'points[0].x', draggedNote);
      const draggedY = getOr(0, 'points[0].y', draggedNote);
      const maxX = max(notes.map(getOr(0, 'points[1].x')));
      const maxY = max(notes.map(getOr(0, 'points[1].y')));
      const minX = min(notes.map(getOr(0, 'points[0].x')));
      const minY = min(notes.map(getOr(0, 'points[0].y')));
      const baseBottom = Dawww.OCTAVE_RANGE.length * 12 - 1;
      const baseRight = measureCount * 8 * 4 - 1;

      setPositionBounds({
        bottom: (baseBottom - (maxY - draggedY)) * 40,
        left: (draggedX - minX) * 40,
        right: (baseRight - (maxX - draggedX)) * 40,
        top: (draggedY - minY) * 40,
      });

      handleErase(draggedNote);

      handleSelect(draggedNote, e);
    },
    [handleErase, handleSelect, measureCount, selectedNotes],
  );

  const handleNoteDragStop = React.useCallback(() => {
    const draggedNotes = applyPositionDeltas(notes, positionDeltas);

    if (!isEqual(draggedNotes, notes)) {
      onDrag(draggedNotes);
    }

    setPositionDeltas({});
  }, [notes, onDrag, positionDeltas]);

  const handleNoteEndPointDrag = React.useCallback(
    ({ x }) => {
      const deltaReducer = (acc, cur) => {
        const prevX = getOr(0, `[${cur.id}].x`, acc);
        const newX = prevX + x;

        return { ...acc, [cur.id]: { x: newX } };
      };
      const newDeltas = selectedNotes.reduce(deltaReducer, sizeDeltas);

      if (isEqual(newDeltas, sizeDeltas)) return;

      setSizeDeltas(newDeltas);
    },
    [selectedNotes, sizeDeltas],
  );

  const handleNoteEndPointDragStart = React.useCallback(
    (sizedNote, e) => {
      const notes = uniqBy(x => x.id, [...selectedNotes, sizedNote]);
      const maxPositionX = max(notes.map(getOr(0, 'points[0].x')));
      const baseRight = measureCount * 8 * 4 - 1;

      setSizeBounds({
        bottom: undefined,
        left: 40,
        right: (baseRight - maxPositionX) * 40,
        top: undefined,
      });

      handleSelect(sizedNote, e);
    },
    [handleSelect, measureCount, selectedNotes],
  );

  const handleNoteEndPointDragStop = React.useCallback(() => {
    onResize(applySizeDeltas(notes, sizeDeltas));

    setSizeDeltas({});
  }, [notes, onResize, sizeDeltas]);

  return (
    <div
      className={classes.root}
      style={{
        width: measureCount * 4 * 8 * 40,
      }}
    >
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
          positionBounds={positionBounds}
          sizeBounds={sizeBounds}
          note={note}
        />
      ))}
    </div>
  );
}

export default React.memo(withStyles(styles)(Notes));

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
