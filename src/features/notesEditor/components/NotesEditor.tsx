import getOr from 'lodash/fp/getOr';
import includes from 'lodash/fp/includes';
import isEmpty from 'lodash/fp/isEmpty';
import uniq from 'lodash/fp/uniq';
import memoizeOne from 'memoize-one';
import PropTypes from 'prop-types';
import React from 'react';
import { GlobalHotKeys } from 'react-hotkeys';

import Dawww from '../../../dawww';
import api from '../../api';
import audio from '../../audio';
import shared from '../../shared';
import { toolTypes } from '../constants';
import Grid from './Grid';
import Keys from './Keys';
import NotesEditorToolbar from './NotesEditorToolbar';

const { getTempId } = api.helpers;
const {
  useCreateNote,
  useDeleteNotes,
  useDuplicateNotes,
  useGetSequence,
  useUpdateNotes,
} = api.hooks;
const { useAudioManager } = audio.hooks;
const { Box, LoadingIndicator } = shared.components;
const { toggleInArray } = shared.helpers;

const getNotesByIds = memoizeOne((notes, ids) =>
  notes.filter((note) => includes(note.id, ids)),
);

NotesEditor.propTypes = {
  navigate: PropTypes.func,
  sequenceId: PropTypes.string,
};

function NotesEditor(props: any) {
  const { navigate, sequenceId: sequenceIdProp } = props;
  const sequenceId = parseInt(sequenceIdProp);
  const audioManager = useAudioManager();
  const [createNote] = useCreateNote();
  const [deleteNotes] = useDeleteNotes();
  const [duplicateNotes] = useDuplicateNotes();
  const [updateNotes] = useUpdateNotes();
  const { data, loading } = useGetSequence({
    variables: {
      id: sequenceId,
    },
  });
  const [contentEl, setContentEl] = React.useState<HTMLDivElement>();
  const [mousePoint, setMousePoint] = React.useState({ x: -1, y: 1 });
  const [previousToolType, setPreviousToolType] = React.useState(
    toolTypes.SELECT,
  );
  const [selectedNoteIds, setSelectedNoteIds] = React.useState<number[]>([]);
  const [toolType, setToolType] = React.useState(toolTypes.SELECT);

  const sequence = React.useMemo(() => (data ? data.sequence : null), [data]);

  const notes = React.useMemo(() => (sequence ? sequence.notes : []), [
    sequence,
  ]);

  const selectedNotes = React.useMemo(
    () => getNotesByIds(notes, selectedNoteIds),
    [notes, selectedNoteIds],
  );

  const handleClose = React.useCallback(() => {
    navigate('../../');
  }, [navigate]);

  const handleContentRefChange = React.useCallback((ref: HTMLDivElement) => {
    setContentEl(ref);
  }, []);

  const handleDelete = React.useCallback(
    (e) => {
      e.preventDefault();

      if (isEmpty(selectedNotes)) return;

      deleteNotes({
        notes: selectedNotes,
      });

      setSelectedNoteIds([]);
    },
    [deleteNotes, selectedNotes],
  );

  const handleDeselectAll = React.useCallback((e) => {
    e.preventDefault();

    setSelectedNoteIds([]);
  }, []);

  const handleDrawToolActivate = React.useCallback(() => {
    setToolType(toolTypes.DRAW);
  }, []);

  const handleDuplicate = React.useCallback(
    async (e) => {
      e.preventDefault();

      if (isEmpty(selectedNotes)) return;

      const tempIds = selectedNotes.map(getTempId);

      setSelectedNoteIds(tempIds);

      const duplicatedNotes = await duplicateNotes({
        notes: selectedNotes,
        tempIds,
      });

      setSelectedNoteIds(duplicatedNotes.map((note) => note.id));
    },
    [duplicateNotes, selectedNotes],
  );

  const handleEraseToolActivate = React.useCallback(() => {
    setToolType(toolTypes.ERASE);
  }, []);

  const handlePreviewPitch = React.useCallback(
    (pitch) => {
      audioManager.preview(sequence.trackId, pitch);
    },
    [audioManager, sequence],
  );

  const handleGridDragPreview = React.useCallback(
    (notes) => {
      if (notes.length !== 1) return;

      handlePreviewPitch(notes[0].points[0].y);
    },
    [handlePreviewPitch],
  );

  const handleGridDraw = React.useCallback(
    (point) => {
      handlePreviewPitch(point.y);

      createNote({
        points: [point, { x: point.x + 1, y: point.y }],
        sequenceId: sequence.id,
      });
    },
    [createNote, handlePreviewPitch, sequence],
  );

  const handleGridErase = React.useCallback(
    (note) => {
      setSelectedNoteIds([]);

      deleteNotes({
        notes: [note],
      });
    },
    [deleteNotes],
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

  const handleNotesUpdate = React.useCallback(
    (notes) => {
      updateNotes({
        notes,
      });
    },
    [updateNotes],
  );

  const handleNudge = React.useCallback(
    (delta) => {
      if (isEmpty(selectedNotes)) return;

      // TODO: Why does this not just use selectedNotes?
      const notesToNudge = notes.filter((note) =>
        includes(
          note.id,
          selectedNotes.map((selectedNote) => selectedNote.id),
        ),
      );

      if (
        audioManager.helpers.someNoteWillMoveOutside(
          sequence.measureCount,
          delta,
          notesToNudge,
        )
      )
        return;

      if (delta.y !== 0 && notesToNudge.length === 1) {
        handlePreviewPitch(notesToNudge[0].points[0].y + delta.y);
      }

      updateNotes({
        notes: notesToNudge.map(audioManager.helpers.translateNote(delta)),
      });
    },
    [
      audioManager,
      handlePreviewPitch,
      notes,
      selectedNotes,
      sequence,
      updateNotes,
    ],
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
    () =>
      updateNotes({
        notes: selectedNotes.map(
          audioManager.helpers.translateNote({ x: 0, y: 12 }),
        ),
      }),
    [audioManager, selectedNotes, updateNotes],
  );

  const handleToolbarOctaveUp = React.useCallback(
    () =>
      updateNotes({
        notes: selectedNotes.map(
          audioManager.helpers.translateNote({ x: 0, y: -12 }),
        ),
      }),
    [audioManager, selectedNotes, updateNotes],
  );

  React.useEffect(() => {
    if (!data) return;

    audioManager.updateSequence(data.sequence);
  }, [audioManager, data, sequenceId]);

  React.useEffect(() => {
    if (!contentEl) return;

    contentEl.scrollTop = shared.helpers.getCenteredScroll(contentEl);
  }, [contentEl]);

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
                onDrag={handleNotesUpdate}
                onDragPreview={handleGridDragPreview}
                onDraw={handleGridDraw}
                onErase={handleGridErase}
                onMousePointChange={setMousePoint}
                onResize={handleNotesUpdate}
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
