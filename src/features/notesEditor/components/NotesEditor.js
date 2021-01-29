import getOr from 'lodash/fp/getOr';
import includes from 'lodash/fp/includes';
import isEmpty from 'lodash/fp/isEmpty';
import uniq from 'lodash/fp/uniq';
import memoizeOne from 'memoize-one';
import PropTypes from 'prop-types';
import React from 'react';
import { GlobalHotKeys } from 'react-hotkeys';

import Dawww from '../../../dawww';
import audio from '../../audio';
import shared from '../../shared';
import songFeature from '../../song';
import { toolTypes } from '../constants';
import Grid from './Grid';
import Keys from './Keys';
import NotesEditorToolbar from './NotesEditorToolbar';

const { useAudioManager } = audio.hooks;
const { Box, LoadingIndicator } = shared.components;
const { toggleInArray } = shared.helpers;
const { useSong } = songFeature.hooks;

const getNotesByIds = memoizeOne((notes, ids) =>
  notes.filter((note) => includes(note.id, ids)),
);

NotesEditor.propTypes = {
  navigate: PropTypes.func,
  onDelete: PropTypes.func,
  onDrag: PropTypes.func,
  onDraw: PropTypes.func,
  onDuplicate: PropTypes.func,
  onErase: PropTypes.func,
  onNudge: PropTypes.func,
  onOctaveDown: PropTypes.func,
  onOctaveUp: PropTypes.func,
  onResize: PropTypes.func,
  sequenceId: PropTypes.string,
};

function NotesEditor(props) {
  const {
    navigate,
    onDelete,
    onDrag,
    onDraw,
    onDuplicate,
    onErase,
    onNudge,
    onOctaveDown,
    onOctaveUp,
    onResize,
    sequenceId,
  } = props;
  const audioManager = useAudioManager();
  const { loading, song } = useSong();
  const [contentEl, setContentEl] = React.useState();
  const [mousePoint, setMousePoint] = React.useState({ x: -1, y: 1 });
  const [previousToolType, setPreviousToolType] = React.useState(
    toolTypes.SELECT,
  );
  const [selectedNoteIds, setSelectedNoteIds] = React.useState([]);
  const [toolType, setToolType] = React.useState(toolTypes.SELECT);

  const sequence = React.useMemo(() => {
    if (!song) {
      return null;
    }

    return song.sequences[sequenceId];
  }, [sequenceId, song]);

  const notes = React.useMemo(() => {
    if (!song) {
      return [];
    }

    return Object.values(song.notes).filter(
      (note) => note.sequenceId === sequenceId,
    );
  }, [sequenceId, song]);

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
      audioManager.previewPitch(sequence.trackId, pitch);
    },
    [audioManager, sequence],
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
    [handlePreviewPitch, onDraw, sequence],
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
    [handlePreviewPitch, notes, onNudge, selectedNotes, sequence],
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

  React.useEffect(() => {
    if (!song) return;
    audioManager.updateSong({ ...song, focusedSequenceId: sequenceId });
  }, [audioManager, sequenceId, song]);

  React.useEffect(() => {
    if (!contentEl) return;

    contentEl.scrollTop = shared.helpers.getCenteredScroll(contentEl);
  }, [contentEl, sequence]);

  return (
    <Box
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
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
        }}
      />
      {loading ? (
        <LoadingIndicator>LOADING SONG...</LoadingIndicator>
      ) : (
        <React.Fragment>
          <Box
            ref={handleContentRefChange}
            sx={{
              display: 'flex',
              flex: '1 1 0',
              flexDirection: 'column',
              overflowX: 'hidden',
              overflowY: 'scroll',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flex: '1 0 auto',
                paddingBottom: 16,
                paddingTop: 16,
              }}
            >
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
            </Box>
          </Box>
          <NotesEditorToolbar
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
            onSelectToolSelect={handleSelectToolActivate}
            selectedNotes={selectedNotes}
            toolType={toolType}
          />
        </React.Fragment>
      )}
    </Box>
  );
}

export default React.memo(NotesEditor);
