import { Box, IconButton, Stack, Toolbar, Tooltip } from 'aria-ui';
import isEmpty from 'lodash/fp/isEmpty';
import ArrowBackIcon from 'mdi-react/ArrowBackIcon';
import ArrowDownwardIcon from 'mdi-react/ArrowDownwardIcon';
import ArrowUpwardIcon from 'mdi-react/ArrowUpwardIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import ContentCopyIcon from 'mdi-react/ContentCopyIcon';
import DeleteIcon from 'mdi-react/DeleteIcon';
import EditIcon from 'mdi-react/EditIcon';
import EraserIcon from 'mdi-react/EraserIcon';
import HandRightIcon from 'mdi-react/HandRightIcon';
import NearMeIcon from 'mdi-react/NearMeIcon';
import { FC, memo, MouseEventHandler, useMemo } from 'react';

import { Dawww } from '../../../dawww';
import { Note } from '../../../types';
import { SelectableIconButton } from '../../shared';
import { ToolType } from '../types';

export interface NotesEditorToolbarProps {
  measureCount?: number;
  onClose: MouseEventHandler<HTMLButtonElement>;
  onDelete: MouseEventHandler<HTMLButtonElement>;
  onDeselectAll: MouseEventHandler<HTMLButtonElement>;
  onDrawToolSelect: MouseEventHandler<HTMLButtonElement>;
  onDuplicate: MouseEventHandler<HTMLButtonElement>;
  onEraseToolSelect: MouseEventHandler<HTMLButtonElement>;
  onOctaveDown: MouseEventHandler<HTMLButtonElement>;
  onOctaveUp: MouseEventHandler<HTMLButtonElement>;
  onPanToolSelect: MouseEventHandler<HTMLButtonElement>;
  onSelectToolSelect: MouseEventHandler<HTMLButtonElement>;
  selectedNotes: Note[];
  toolType: ToolType;
}

export const NotesEditorToolbar: FC<NotesEditorToolbarProps> = memo((props) => {
  const {
    measureCount = 0,
    onClose,
    onDelete,
    onDeselectAll,
    onDrawToolSelect,
    onDuplicate,
    onEraseToolSelect,
    onOctaveDown,
    onOctaveUp,
    onPanToolSelect,
    onSelectToolSelect,
    selectedNotes,
    toolType,
  } = props;

  const areSomeNotesSelected = !isEmpty(selectedNotes);

  const isOctaveDownButtonDisabled = useMemo(
    () =>
      Dawww.someNoteWillMoveOutside(
        measureCount,
        { x: 0, y: 12 },
        selectedNotes,
      ),
    [measureCount, selectedNotes],
  );

  const isOctaveUpButtonDisabled = useMemo(
    () =>
      Dawww.someNoteWillMoveOutside(
        measureCount,
        { x: 0, y: -12 },
        selectedNotes,
      ),
    [measureCount, selectedNotes],
  );

  return (
    <Toolbar padding={2}>
      <Stack direction="row" space={2} sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          {areSomeNotesSelected ? (
            <IconButton
              icon={<CloseIcon />}
              onClick={onDeselectAll}
              title="Deselect notes"
            />
          ) : (
            <Tooltip text="Back to tracks">
              <IconButton
                icon={<ArrowBackIcon />}
                onClick={onClose}
                title="Back to tracks"
              />
            </Tooltip>
          )}
        </Box>
        {!areSomeNotesSelected && (
          <>
            <Tooltip text="Select">
              <SelectableIconButton
                icon={<NearMeIcon />}
                isSelected={toolType === 'SELECT'}
                onClick={onSelectToolSelect}
              />
            </Tooltip>
            <Tooltip text="Draw">
              <SelectableIconButton
                icon={<EditIcon />}
                isSelected={toolType === 'DRAW'}
                onClick={onDrawToolSelect}
              />
            </Tooltip>
            <Tooltip text="Erase">
              <SelectableIconButton
                icon={<EraserIcon />}
                isSelected={toolType === 'ERASE'}
                onClick={onEraseToolSelect}
              />
            </Tooltip>
            <Tooltip text="Pan">
              <SelectableIconButton
                icon={<HandRightIcon />}
                isSelected={toolType === 'PAN'}
                onClick={onPanToolSelect}
              />
            </Tooltip>
          </>
        )}
        {areSomeNotesSelected && (
          <>
            <IconButton
              icon={<DeleteIcon />}
              onClick={onDelete}
              title="Delete"
            />
            <IconButton
              icon={<ContentCopyIcon />}
              onClick={onDuplicate}
              title="Duplicate"
            />
            <IconButton
              disabled={isOctaveUpButtonDisabled}
              icon={<ArrowUpwardIcon />}
              onClick={onOctaveUp}
              title="Octave up"
            />
            <IconButton
              disabled={isOctaveDownButtonDisabled}
              icon={<ArrowDownwardIcon />}
              onClick={onOctaveDown}
              title="Octave down"
            />
          </>
        )}
      </Stack>
    </Toolbar>
  );
});
