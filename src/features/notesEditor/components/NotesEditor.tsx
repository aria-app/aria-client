import { RouteComponentProps } from '@reach/router';
import { Box } from 'aria-ui';
import getOr from 'lodash/fp/getOr';
import includes from 'lodash/fp/includes';
import isEmpty from 'lodash/fp/isEmpty';
import uniq from 'lodash/fp/uniq';
import memoizeOne from 'memoize-one';
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { GlobalHotKeys } from 'react-hotkeys';

import { Dawww } from '../../../dawww';
import {
  getTempId,
  useCreateNote,
  useDeleteNotes,
  useDuplicateNotes,
  useGetSequence,
  useUpdateNotes,
} from '../../api';
import { useAudioManager } from '../../audio';
import {
  getCenteredScroll,
  LoadingIndicator,
  toggleInArray,
} from '../../shared';
import { ToolType } from '../types';
import { Grid } from './Grid';
import { Keys } from './Keys';
import { NotesEditorToolbar } from './NotesEditorToolbar';

const getNotesByIds = memoizeOne((notes, ids) =>
  notes.filter((note) => includes(note.id, ids)),
);

export const NotesEditor: FC<
  RouteComponentProps<{
    sequenceId: string;
  }>
> = memo((props) => {
  const { navigate, sequenceId: sequenceIdProp } = props;
  const sequenceId = sequenceIdProp ? parseInt(sequenceIdProp) : -1;
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
  const [contentEl, setContentEl] = useState<HTMLDivElement | null>(null);
  const [mousePoint, setMousePoint] = useState({ x: -1, y: 1 });
  const [previousToolType, setPreviousToolType] = useState<ToolType>('SELECT');
  const [selectedNoteIds, setSelectedNoteIds] = useState<number[]>([]);
  const [toolType, setToolType] = useState<ToolType>('SELECT');

  const sequence = useMemo(() => (data ? data.sequence : null), [data]);

  const notes = useMemo(() => (sequence ? sequence.notes : []), [sequence]);

  const selectedNotes = useMemo(
    () => getNotesByIds(notes, selectedNoteIds),
    [notes, selectedNoteIds],
  );

  const handleClose = useCallback(() => {
    navigate?.('../../');
  }, [navigate]);

  const handleContentRefChange = useCallback((ref: HTMLDivElement) => {
    setContentEl(ref);
  }, []);

  const handleDelete = useCallback(
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

  const handleDeselectAll = useCallback((e) => {
    e.preventDefault();

    setSelectedNoteIds([]);
  }, []);

  const handleDrawToolActivate = useCallback(() => {
    setToolType('DRAW');
  }, []);

  const handleDuplicate = useCallback(
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

  const handleEraseToolActivate = useCallback(() => {
    setToolType('ERASE');
  }, []);

  const handlePreviewPitch = useCallback(
    (pitch) => {
      if (!sequence) return;

      audioManager.preview(sequence.track.id, pitch);
    },
    [audioManager, sequence],
  );

  const handleGridDragPreview = useCallback(
    (notes) => {
      if (notes.length !== 1) return;

      handlePreviewPitch(notes[0].points[0].y);
    },
    [handlePreviewPitch],
  );

  const handleGridDraw = useCallback(
    (point) => {
      if (!sequence) return;

      handlePreviewPitch(point.y);

      createNote({
        points: [point, { x: point.x + 1, y: point.y }],
        sequenceId: sequence.id,
      });
    },
    [createNote, handlePreviewPitch, sequence],
  );

  const handleGridErase = useCallback(
    (note) => {
      setSelectedNoteIds([]);

      deleteNotes({
        notes: [note],
      });
    },
    [deleteNotes],
  );

  const handleGridSelect = useCallback(
    (note, isAdditive) => {
      const pitch = getOr(-1, 'points[0].y', note);

      handlePreviewPitch(pitch);

      setSelectedNoteIds(
        isAdditive ? toggleInArray(note.id, selectedNoteIds) : [note.id],
      );
    },
    [handlePreviewPitch, selectedNoteIds],
  );

  const handleGridSelectInArea = useCallback(
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

  const handleNotesUpdate = useCallback(
    (notes) => {
      updateNotes({
        notes,
      });
    },
    [updateNotes],
  );

  const handleNudge = useCallback(
    (delta) => {
      if (!sequence || isEmpty(selectedNotes)) return;

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

  const handleNudgeDown = useCallback(
    (e) => {
      e.preventDefault();

      handleNudge({ x: 0, y: 1 });
    },
    [handleNudge],
  );

  const handleNudgeLeft = useCallback(
    (e) => {
      e.preventDefault();

      handleNudge({ x: -1, y: 0 });
    },
    [handleNudge],
  );

  const handleNudgeRight = useCallback(
    (e) => {
      e.preventDefault();

      handleNudge({ x: 1, y: 0 });
    },
    [handleNudge],
  );

  const handleNudgeUp = useCallback(
    (e) => {
      e.preventDefault();

      handleNudge({ x: 0, y: -1 });
    },
    [handleNudge],
  );

  const handlePanOverrideActivate = useCallback(
    (e) => {
      e.preventDefault();

      if (e.repeat) return;

      setPreviousToolType(toolType);

      setToolType('PAN');
    },
    [toolType],
  );

  const handlePanOverrideDeactivate = useCallback(
    (e) => {
      if (e.keyCode !== 32) return;

      setToolType(previousToolType);
    },
    [previousToolType],
  );

  const handlePanToolActivate = useCallback(() => {
    setToolType('PAN');
  }, []);

  const handleSelectAll = useCallback(() => {
    if (notes.length === selectedNotes.length) return;

    setSelectedNoteIds(notes.map((note) => note.id));
  }, [notes, selectedNotes.length]);

  const handleSelectToolActivate = useCallback(() => {
    setToolType('SELECT');
  }, []);

  const handleToolbarOctaveDown = useCallback(
    () =>
      updateNotes({
        notes: selectedNotes.map(
          audioManager.helpers.translateNote({ x: 0, y: 12 }),
        ),
      }),
    [audioManager, selectedNotes, updateNotes],
  );

  const handleToolbarOctaveUp = useCallback(
    () =>
      updateNotes({
        notes: selectedNotes.map(
          audioManager.helpers.translateNote({ x: 0, y: -12 }),
        ),
      }),
    [audioManager, selectedNotes, updateNotes],
  );

  useEffect(() => {
    if (!data) return;

    audioManager.updateSequence(data.sequence);
  }, [audioManager, data, sequenceId]);

  useEffect(() => {
    if (!contentEl) return;

    contentEl.scrollTop = getCenteredScroll(contentEl);
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
        <>
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
              paddingY={16}
              sx={{
                display: 'flex',
                flex: '1 0 auto',
              }}
            >
              <Keys
                hoveredRow={mousePoint.y}
                octaveCount={Dawww.OCTAVE_RANGE.length}
                onKeyPress={handlePreviewPitch}
              />
              <Grid
                measureCount={sequence?.measureCount}
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
            measureCount={sequence?.measureCount}
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
        </>
      )}
    </Box>
  );
});
