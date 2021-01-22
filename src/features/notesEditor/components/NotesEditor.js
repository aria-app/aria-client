import Fade from '@material-ui/core/Fade';
import withStyles from '@material-ui/styles/withStyles';
import getOr from 'lodash/fp/getOr';
import includes from 'lodash/fp/includes';
import isEmpty from 'lodash/fp/isEmpty';
import uniq from 'lodash/fp/uniq';
import memoizeOne from 'memoize-one';
import React from 'react';
import { GlobalHotKeys } from 'react-hotkeys';

import Dawww from '../../../dawww';
import audio from '../../audio';
import shared from '../../shared';
import { toolTypes } from '../constants';
import Grid from './Grid';
import Keys from './Keys';
import NotesEditorToolbar from './NotesEditorToolbar';

const { previewPitch } = audio.helpers;
const { LoadingIndicator } = shared.components;
const { toggleInArray } = shared.helpers;

const getNotesByIds = memoizeOne((notes, ids) =>
  notes.filter((note) => includes(note.id, ids)),
);

const styles = {
  root: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
  },
  content: {
    display: 'flex',
    flex: '1 1 0',
    flexDirection: 'column',
    overflowX: 'hidden',
    overflowY: 'scroll',
  },
  wrapper: {
    display: 'flex',
    flex: '1 0 auto',
    paddingBottom: 64,
    paddingTop: 64,
  },
};

// export interface NotesEditorProps extends WithStyles<typeof styles> {
//   isRedoEnabled?: boolean;
//   isLoading?: boolean;
//   isUndoEnabled?: boolean;
//   notes?: Array<Note>;
//   navigate?: (path: string) => void;
//   onDelete?: (notes: Array<Note>) => void;
//   onDrag?: (notes: Array<Note>) => void;
//   onDraw?: (note: Note) => void;
//   onDuplicate?: (notes: Array<Note>) => void;
//   onErase?: (note: Note) => void;
//   onLoad?: (payload: { songId: string, sequenceId: string }) => void;
//   onNudge?: (delta: Point, notes: Array<Note>) => void;
//   onOctaveDown?: (notes: Array<Note>) => void;
//   onOctaveUp?: (notes: Array<Note>) => void;
//   onRedo?: () => void;
//   onResize?: (resizedNotes: Array<Note>) => void;
//   onUndo?: () => void;
//   sequence?: Sequence;
//   sequenceId?: string;
//   songId?: string;
// }

function NotesEditor(props) {
  const {
    classes,
    isRedoEnabled,
    isLoading,
    isUndoEnabled,
    navigate,
    notes,
    onDelete,
    onDrag,
    onDraw,
    onDuplicate,
    onErase,
    onLoad,
    onNudge,
    onOctaveDown,
    onOctaveUp,
    onRedo,
    onResize,
    onUndo,
    sequence,
    sequenceId,
    songId,
  } = props;
  const [contentEl, setContentEl] = React.useState();
  const [mousePoint, setMousePoint] = React.useState({ x: -1, y: 1 });
  const [previousToolType, setPreviousToolType] = React.useState(
    toolTypes.SELECT,
  );
  const [selectedNoteIds, setSelectedNoteIds] = React.useState([]);
  const [toolType, setToolType] = React.useState(toolTypes.SELECT);

  const selectedNotes = React.useMemo(
    () => getNotesByIds(notes, selectedNoteIds),
    [notes, selectedNoteIds],
  );

  const handleClose = React.useCallback(() => {
    navigate('../../');
  }, [navigate]);

  const handleContentRefChange = React.useCallback((ref) => {
    setContentEl(ref);
  }, []);

  const handleDelete = React.useCallback(
    (e) => {
      e.preventDefault();

      if (isEmpty(selectedNotes)) return;

      onDelete(selectedNotes);

      setSelectedNoteIds([]);
    },
    [onDelete, selectedNotes],
  );

  const handleDeselectAll = React.useCallback((e) => {
    e.preventDefault();

    setSelectedNoteIds([]);
  }, []);

  const handleDrawToolActivate = React.useCallback(() => {
    setToolType(toolTypes.DRAW);
  }, []);

  const handleDuplicate = React.useCallback(
    (e) => {
      e.preventDefault();

      if (isEmpty(selectedNotes)) return;

      const duplicatedNotes = Dawww.duplicateNotes(selectedNotes);

      onDuplicate(duplicatedNotes);

      setSelectedNoteIds(duplicatedNotes.map((note) => note.id));
    },
    [onDuplicate, selectedNotes],
  );

  const handleEraseToolActivate = React.useCallback(() => {
    setToolType(toolTypes.ERASE);
  }, []);

  const handlePreviewPitch = React.useCallback(
    (pitch) => {
      previewPitch(sequence.trackId, pitch);
    },
    [sequence.trackId],
  );

  const handleGridDragPreview = React.useCallback(
    (notes) => {
      const pitch = getOr(-1, '[0].points[0].y', notes);

      handlePreviewPitch(pitch);
    },
    [handlePreviewPitch],
  );

  const handleGridDraw = React.useCallback(
    (point) => {
      handlePreviewPitch(point.y);

      const note = Dawww.createNote(sequence.id, [
        point,
        { x: point.x + 1, y: point.y },
      ]);

      onDraw(note);
    },
    [handlePreviewPitch, onDraw, sequence.id],
  );

  const handleGridErase = React.useCallback(
    (note) => {
      onErase(note);

      setSelectedNoteIds([]);
    },
    [onErase],
  );

  const handleGridSelect = React.useCallback(
    (note, isAdditive) => {
      const pitch = getOr(-1, 'points[0].y', note);

      handlePreviewPitch(pitch);

      setSelectedNoteIds(
        isAdditive ? toggleInArray(note.id, selectedNoteIds) : [note.id],
      );
    },
    [handlePreviewPitch, selectedNoteIds],
  );

  const handleGridSelectInArea = React.useCallback(
    (startPoint, endPoint, isAdditive) => {
      const notesInArea = Dawww.getNotesInArea(startPoint, endPoint, notes);

      if (isEmpty(notesInArea)) {
        setSelectedNoteIds([]);

        return;
      }

      setSelectedNoteIds(
        isAdditive
          ? uniq([...selectedNoteIds, ...notesInArea.map((note) => note.id)])
          : notesInArea.map((note) => note.id),
      );
    },
    [notes, selectedNoteIds],
  );

  const handleNudge = React.useCallback(
    (delta) => {
      if (isEmpty(selectedNotes)) return;

      const notesToNudge = notes.filter((note) =>
        includes(
          note.id,
          selectedNotes.map((selectedNote) => selectedNote.id),
        ),
      );

      if (
        Dawww.someNoteWillMoveOutside(
          sequence.measureCount,
          delta,
          notesToNudge,
        )
      )
        return;

      if (delta.y !== 0) {
        const pitch = getOr(-1, '[0].points[0].y', notesToNudge);

        handlePreviewPitch(pitch + delta.y);
      }

      onNudge(delta, notesToNudge);
    },
    [handlePreviewPitch, notes, onNudge, selectedNotes, sequence.measureCount],
  );

  const handleNudgeDown = React.useCallback(
    (e) => {
      e.preventDefault();

      handleNudge({ x: 0, y: 1 });
    },
    [handleNudge],
  );

  const handleNudgeLeft = React.useCallback(
    (e) => {
      e.preventDefault();

      handleNudge({ x: -1, y: 0 });
    },
    [handleNudge],
  );

  const handleNudgeRight = React.useCallback(
    (e) => {
      e.preventDefault();

      handleNudge({ x: 1, y: 0 });
    },
    [handleNudge],
  );

  const handleNudgeUp = React.useCallback(
    (e) => {
      e.preventDefault();

      handleNudge({ x: 0, y: -1 });
    },
    [handleNudge],
  );

  const handlePanOverrideActivate = React.useCallback(
    (e) => {
      e.preventDefault();

      if (e.repeat) return;

      setPreviousToolType(toolType);

      setToolType(toolTypes.PAN);
    },
    [toolType],
  );

  const handlePanOverrideDeactivate = React.useCallback(
    (e) => {
      if (e.keyCode !== 32) return;

      setToolType(previousToolType);
    },
    [previousToolType],
  );

  const handlePanToolActivate = React.useCallback(() => {
    setToolType(toolTypes.PAN);
  }, []);

  const handleRedo = React.useCallback(() => {
    if (!isRedoEnabled) return;

    onRedo();
  }, [isRedoEnabled, onRedo]);

  const handleSelectAll = React.useCallback(() => {
    if (notes.length === selectedNotes.length) return;

    setSelectedNoteIds(notes.map((note) => note.id));
  }, [notes, selectedNotes.length]);

  const handleSelectToolActivate = React.useCallback(() => {
    setToolType(toolTypes.SELECT);
  }, []);

  const handleToolbarOctaveDown = React.useCallback(
    () => onOctaveDown(selectedNotes),
    [onOctaveDown, selectedNotes],
  );

  const handleToolbarOctaveUp = React.useCallback(
    () => onOctaveUp(selectedNotes),
    [onOctaveUp, selectedNotes],
  );

  const handleUndo = React.useCallback(() => {
    if (!isUndoEnabled) return;

    onUndo();
  }, [isUndoEnabled, onUndo]);

  React.useEffect(() => {
    onLoad({ sequenceId, songId });

    if (!contentEl) return;

    contentEl.scrollTop = shared.helpers.getCenteredScroll(contentEl);
  }, [contentEl, sequenceId, songId, onLoad]);

  React.useEffect(() => {
    if (!contentEl) return;

    contentEl.scrollTop = shared.helpers.getCenteredScroll(contentEl);
  }, [contentEl, sequence]);

  return (
    <div className={classes.root}>
      <GlobalHotKeys
        allowChanges={true}
        handlers={{
          DELETE: handleDelete,
          DRAW_TOOL: handleDrawToolActivate,
          NUDGE_DOWN: handleNudgeDown,
          ERASE_TOOL: handleEraseToolActivate,
          NUDGE_LEFT: handleNudgeLeft,
          PAN_TOOL: handlePanToolActivate,
          NUDGE_RIGHT: handleNudgeRight,
          SELECT_TOOL: handleSelectToolActivate,
          PAN_START: handlePanOverrideActivate,
          PAN_STOP: handlePanOverrideDeactivate,
          NUDGE_UP: handleNudgeUp,
          SELECT_ALL: handleSelectAll,
          DESELECT: handleDeselectAll,
          DUPLICATE: handleDuplicate,
          REDO: onRedo,
          UNDO: onUndo,
        }}
        keyMap={{
          DELETE: ['backspace', 'del'],
          DRAW_TOOL: 'd',
          NUDGE_DOWN: 'down',
          ERASE_TOOL: 'e',
          NUDGE_LEFT: 'left',
          PAN_TOOL: 'p',
          NUDGE_RIGHT: 'right',
          SELECT_TOOL: 's',
          PAN_START: { sequence: 'space', action: 'keydown' },
          PAN_STOP: { sequence: 'space', action: 'keyup' },
          NUDGE_UP: 'up',
          SELECT_ALL: ['ctrl+a', 'meta+a'],
          DESELECT: ['ctrl+d', 'meta+d'],
          DUPLICATE: ['ctrl+shift+d', 'meta+shift+d'],
          REDO: ['ctrl+alt+z', 'meta+alt+z'],
          UNDO: ['ctrl+z', 'meta+z'],
        }}
      />
      <Fade in={isLoading} mountOnEnter unmountOnExit>
        <LoadingIndicator>LOADING SONG...</LoadingIndicator>
      </Fade>
      <React.Fragment>
        <div className={classes.content} ref={handleContentRefChange}>
          <Fade in={!isLoading} mountOnEnter unmountOnExit>
            <div className={classes.wrapper}>
              <Keys hoveredRow={mousePoint.y} onKeyPress={handlePreviewPitch} />
              <Grid
                measureCount={sequence.measureCount}
                mousePoint={mousePoint}
                notes={notes}
                notesEditorContentEl={contentEl}
                onDrag={onDrag}
                onDragPreview={handleGridDragPreview}
                onDraw={handleGridDraw}
                onErase={handleGridErase}
                onMousePointChange={setMousePoint}
                onResize={onResize}
                onSelect={handleGridSelect}
                onSelectInArea={handleGridSelectInArea}
                selectedNotes={selectedNotes}
                toolType={toolType}
              />
            </div>
          </Fade>
        </div>
        <NotesEditorToolbar
          isRedoEnabled={isRedoEnabled}
          isUndoEnabled={isUndoEnabled}
          measureCount={sequence.measureCount}
          onClose={handleClose}
          onDelete={handleDelete}
          onDeselectAll={handleDeselectAll}
          onDrawToolSelect={handleDrawToolActivate}
          onDuplicate={handleDuplicate}
          onEraseToolSelect={handleEraseToolActivate}
          onOctaveDown={handleToolbarOctaveDown}
          onOctaveUp={handleToolbarOctaveUp}
          onPanToolSelect={handlePanToolActivate}
          onRedo={handleRedo}
          onSelectToolSelect={handleSelectToolActivate}
          onUndo={handleUndo}
          selectedNotes={selectedNotes}
          toolType={toolType}
        />
      </React.Fragment>
    </div>
  );
}

export default React.memo(withStyles(styles)(NotesEditor));
