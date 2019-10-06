import Dawww from 'dawww';
import getOr from 'lodash/fp/getOr';
import includes from 'lodash/fp/includes';
import isEmpty from 'lodash/fp/isEmpty';
import isEqual from 'lodash/fp/isEqual';
import uniq from 'lodash/fp/uniq';
import withStyles from '@material-ui/styles/withStyles';
import memoizeOne from 'memoize-one';
import PropTypes from 'prop-types';
import React from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import audio from '../../audio';
import shared from '../../shared';
import { toolTypes } from '../constants';
import Grid from './Grid';
import Keys from './Keys';
import SequenceEditorToolbar from './SequenceEditorToolbar';

const { previewPitch } = audio.helpers;
const { FadeIn, FadeOut, LoadingIndicator } = shared.components;
const { toggleInArray } = shared.helpers;

const getNotesByIds = memoizeOne((notes, ids) =>
  notes.filter(note => includes(note.id, ids)),
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
    flex: '1 1 auto',
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

function SequenceEditor(props) {
  const {
    classes,
    history,
    isRedoEnabled,
    isLoading,
    isUndoEnabled,
    match,
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
  } = props;
  const [contentEl, setContentEl] = React.useState();
  const [gridMousePoint, setGridMousePoint] = React.useState({ x: -1, y: 1 });
  const [previousToolType, setPreviousToolType] = React.useState(
    toolTypes.SELECT,
  );
  const [selectedNoteIds, setSelectedNoteIds] = React.useState([]);
  const [toolType, setToolType] = React.useState(toolTypes.SELECT);

  const selectedNotes = React.useMemo(
    () => getNotesByIds(notes, selectedNoteIds),
    [notes, selectedNoteIds],
  );

  const activateDrawTool = React.useCallback(() => {
    setToolType(toolTypes.DRAW);
  }, []);

  const activatePanOverride = React.useCallback(
    e => {
      e.preventDefault();

      if (e.repeat) return;

      setPreviousToolType(toolType);

      setToolType(toolTypes.PAN);
    },
    [toolType],
  );

  const activateEraseTool = React.useCallback(() => {
    setToolType(toolType.ERASE);
  }, [toolType.ERASE]);

  const activatePanTool = React.useCallback(() => {
    setToolType(toolType.PAN);
  }, [toolType.PAN]);

  const activateSelectTool = React.useCallback(() => {
    setToolType(toolType.SELECT);
  }, [toolType.SELECT]);

  const handleClose = React.useCallback(() => {
    history.push(`/song/${match.params.songId}`);
  }, [history, match.params.songId]);

  const deactivatePanOverride = React.useCallback(
    e => {
      if (e.keyCode !== 32) return;

      setToolType(previousToolType);
    },
    [previousToolType],
  );

  const deleteSelectedNotes = React.useCallback(
    e => {
      e.preventDefault();

      if (isEmpty(selectedNotes)) return;

      onDelete(selectedNotes);

      setSelectedNoteIds([]);
    },
    [onDelete, selectedNotes],
  );

  const deselectAllNotes = React.useCallback(e => {
    e.preventDefault();

    setSelectedNoteIds([]);
  }, []);

  const duplicateSelectedNotes = React.useCallback(
    e => {
      e.preventDefault();

      if (isEmpty(selectedNotes)) return;

      const duplicatedNotes = Dawww.duplicateNotes(selectedNotes);

      onDuplicate(duplicatedNotes);

      setSelectedNoteIds(duplicatedNotes.map(note => note.id));
    },
    [onDuplicate, selectedNotes],
  );

  const handlePreviewPitch = React.useCallback(
    pitch => {
      previewPitch(sequence.trackId, pitch);
    },
    [sequence.trackId],
  );

  const handleGridDragPreview = React.useCallback(
    notes => {
      const pitch = getOr(-1, '[0].points[0].y', notes);

      handlePreviewPitch(pitch);
    },
    [handlePreviewPitch],
  );

  const handleGridDraw = React.useCallback(
    point => {
      handlePreviewPitch(point.y);

      onDraw(point);
    },
    [handlePreviewPitch, onDraw],
  );

  const handleGridErase = React.useCallback(
    note => {
      onErase(note);

      setSelectedNoteIds([]);
    },
    [onErase],
  );

  const handleGridMouseLeave = React.useCallback(e => {
    setGridMousePoint({
      x: -1,
      y: -1,
    });
  }, []);

  const handleGridMouseMove = React.useCallback(
    e => {
      const nextGridMousePoint = getGridMousePoint(
        e.currentTarget,
        contentEl,
        e,
      );

      if (isEqual(gridMousePoint, nextGridMousePoint)) return;

      setGridMousePoint(nextGridMousePoint);
    },
    [contentEl, gridMousePoint],
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
          ? uniq([...selectedNoteIds, ...notesInArea.map(note => note.id)])
          : notesInArea.map(note => note.id),
      );
    },
    [notes, selectedNoteIds],
  );

  const handleToolbarOctaveDown = React.useCallback(
    () => onOctaveDown(selectedNotes),
    [onOctaveDown, selectedNotes],
  );

  const handleToolbarOctaveUp = React.useCallback(
    () => onOctaveUp(selectedNotes),
    [onOctaveUp, selectedNotes],
  );

  const nudge = React.useCallback(
    delta => {
      if (isEmpty(selectedNotes)) return;

      const notesToNudge = notes.filter(note =>
        includes(note.id, selectedNotes.map(selectedNote => selectedNote.id)),
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

  const nudgeDown = React.useCallback(
    e => {
      e.preventDefault();

      nudge({ x: 0, y: 1 });
    },
    [nudge],
  );

  const nudgeLeft = React.useCallback(
    e => {
      e.preventDefault();

      nudge({ x: -1, y: 0 });
    },
    [nudge],
  );

  const nudgeRight = React.useCallback(
    e => {
      e.preventDefault();

      nudge({ x: 1, y: 0 });
    },
    [nudge],
  );

  const nudgeUp = React.useCallback(
    e => {
      e.preventDefault();

      nudge({ x: 0, y: -1 });
    },
    [nudge],
  );

  const redo = React.useCallback(() => {
    if (!isRedoEnabled) return;

    onRedo();
  }, [isRedoEnabled, onRedo]);

  const selectAll = React.useCallback(() => {
    if (notes.length === selectedNotes.length) return;

    setSelectedNoteIds(notes.map(note => note.id));
  }, [notes, selectedNotes.length]);

  const handleContentRefChange = React.useCallback(ref => {
    setContentEl(ref);
  }, []);

  const undo = React.useCallback(() => {
    if (!isUndoEnabled) return;

    onUndo();
  }, [isUndoEnabled, onUndo]);

  React.useEffect(() => {
    onLoad(match.params.songId, match.params.sequenceId);

    if (!contentEl) return;

    contentEl.scrollTop = shared.helpers.getCenteredScroll(contentEl);
  }, [contentEl, match.params.sequenceId, match.params.songId, onLoad]);

  React.useEffect(() => {
    if (!contentEl) return;

    contentEl.scrollTop = shared.helpers.getCenteredScroll(contentEl);
  }, [contentEl, sequence]);

  return (
    <div className={classes.root}>
      <GlobalHotKeys
        allowChanges={true}
        handlers={{
          DELETE: deleteSelectedNotes,
          DRAW_TOOL: activateDrawTool,
          NUDGE_DOWN: nudgeDown,
          ERASE_TOOL: activateEraseTool,
          NUDGE_LEFT: nudgeLeft,
          PAN_TOOL: activatePanTool,
          NUDGE_RIGHT: nudgeRight,
          SELECT_TOOL: activateSelectTool,
          PAN_START: activatePanOverride,
          PAN_STOP: deactivatePanOverride,
          NUDGE_UP: nudgeUp,
          SELECT_ALL: selectAll,
          DESELECT: deselectAllNotes,
          DUPLICATE: duplicateSelectedNotes,
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
      <FadeOut isVisible={isLoading}>
        <LoadingIndicator>LOADING SONG...</LoadingIndicator>,
      </FadeOut>
      <React.Fragment>
        <div className={classes.content} ref={handleContentRefChange}>
          <FadeIn isVisible={!isLoading}>
            <div className={classes.wrapper}>
              <Keys
                hoveredRow={gridMousePoint.y}
                onKeyPress={handlePreviewPitch}
              />
              <Grid
                measureCount={sequence.measureCount}
                mousePoint={gridMousePoint}
                notes={notes}
                onDrag={onDrag}
                onDragPreview={handleGridDragPreview}
                onDraw={handleGridDraw}
                onErase={handleGridErase}
                onMouseLeave={handleGridMouseLeave}
                onMouseMove={handleGridMouseMove}
                onResize={onResize}
                onSelect={handleGridSelect}
                onSelectInArea={handleGridSelectInArea}
                selectedNotes={selectedNotes}
                sequenceEditorContentRef={contentEl}
                toolType={toolType}
              />
            </div>
          </FadeIn>
        </div>
        <SequenceEditorToolbar
          isRedoEnabled={isRedoEnabled}
          isUndoEnabled={isUndoEnabled}
          measureCount={sequence.measureCount}
          onClose={handleClose}
          onDelete={deleteSelectedNotes}
          onDeselectAll={deselectAllNotes}
          onDrawToolSelect={activateDrawTool}
          onDuplicate={duplicateSelectedNotes}
          onEraseToolSelect={activateEraseTool}
          onOctaveDown={handleToolbarOctaveDown}
          onOctaveUp={handleToolbarOctaveUp}
          onPanToolSelect={activatePanTool}
          onRedo={redo}
          onSelectToolSelect={activateSelectTool}
          onUndo={undo}
          selectedNotes={selectedNotes}
          toolType={toolType}
        />
      </React.Fragment>
    </div>
  );
}

SequenceEditor.propTypes = {
  isRedoEnabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  isUndoEnabled: PropTypes.bool,
  notes: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func,
  onDrag: PropTypes.func,
  onDraw: PropTypes.func,
  onDuplicate: PropTypes.func,
  onErase: PropTypes.func,
  onLoad: PropTypes.func,
  onNudge: PropTypes.func,
  onOctaveDown: PropTypes.func,
  onOctaveUp: PropTypes.func,
  onRedo: PropTypes.func,
  onResize: PropTypes.func,
  onUndo: PropTypes.func,
  sequence: PropTypes.object,
};

export default React.memo(withStyles(styles)(SequenceEditor));

function getGridMousePoint(scrollLeftEl, scrollTopEl, e) {
  const styleOffset = 80;
  const x = e.pageX || 0;
  const y = e.pageY - 56 || 0;
  const offsetLeft = scrollLeftEl.offsetLeft || 0;
  const offsetTop = scrollLeftEl.offsetTop || 0;
  const scrollLeft = scrollLeftEl.scrollLeft || 0;
  const scrollTop = scrollTopEl.scrollTop || 0;

  return {
    x: toSlotNumber(x - offsetLeft + scrollLeft - styleOffset),
    y: toSlotNumber(y - offsetTop + scrollTop),
  };
}

function toSlotNumber(n) {
  return Math.floor(n / 40);
}
