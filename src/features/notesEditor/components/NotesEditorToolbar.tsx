import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import CloseIcon from '@material-ui/icons/Close';
import ContentCopyIcon from '@material-ui/icons/ContentCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import NearMeIcon from '@material-ui/icons/NearMe';
import PanToolIcon from '@material-ui/icons/PanTool';
import isEmpty from 'lodash/fp/isEmpty';
import { memo, MouseEventHandler, useMemo } from 'react';
import EraseIcon from 'react-icons/lib/fa/eraser';

import Dawww from '../../../dawww';
import { Note } from '../../../types';
import { Box, Button, ButtonProps, Stack, Toolbar } from '../../shared';
import * as constants from '../constants';
import { ToolType } from '../types';
const { DRAW, ERASE, PAN, SELECT } = constants.toolTypes;

function SelectableIconButton(props: ButtonProps & { isSelected: boolean }) {
  const { isSelected, ...rest } = props;

  return (
    <Button
      color={isSelected ? 'primary.main' : undefined}
      variant={isSelected ? 'outlined' : 'text'}
      {...rest}
    />
  );
}

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

function NotesEditorToolbar(props: NotesEditorToolbarProps) {
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
    <Toolbar position="bottom">
      <Stack direction="row" space={2}>
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          {areSomeNotesSelected ? (
            <Button
              onClick={onDeselectAll}
              startIcon={<CloseIcon />}
              title="Deselect notes"
              variant="text"
            />
          ) : (
            <Button
              onClick={onClose}
              startIcon={<ArrowBackIcon />}
              title="Back to tracks"
              variant="text"
            />
          )}
        </Box>
        {!areSomeNotesSelected && (
          <>
            <SelectableIconButton
              isSelected={toolType === SELECT}
              onClick={onSelectToolSelect}
              startIcon={<NearMeIcon />}
              title="Select"
            />
            <SelectableIconButton
              isSelected={toolType === DRAW}
              onClick={onDrawToolSelect}
              startIcon={<EditIcon />}
              title="Draw"
            />
            <SelectableIconButton
              isSelected={toolType === ERASE}
              onClick={onEraseToolSelect}
              startIcon={<EraseIcon size={24} />}
              title="Erase"
            />
            <SelectableIconButton
              isSelected={toolType === PAN}
              onClick={onPanToolSelect}
              startIcon={<PanToolIcon />}
              title="Pan"
            />
          </>
        )}
        {areSomeNotesSelected && (
          <>
            <Button
              onClick={onDelete}
              startIcon={<DeleteIcon />}
              title="Delete"
              variant="text"
            />
            <Button
              onClick={onDuplicate}
              startIcon={<ContentCopyIcon />}
              title="Duplicate"
              variant="text"
            />
            <Button
              disabled={isOctaveUpButtonDisabled}
              onClick={onOctaveUp}
              startIcon={<ArrowUpwardIcon />}
              title="Octave up"
              variant="text"
            />
            <Button
              disabled={isOctaveDownButtonDisabled}
              onClick={onOctaveDown}
              startIcon={<ArrowDownwardIcon />}
              title="Octave down"
              variant="text"
            />
          </>
        )}
      </Stack>
    </Toolbar>
  );
}

export default memo(NotesEditorToolbar);
