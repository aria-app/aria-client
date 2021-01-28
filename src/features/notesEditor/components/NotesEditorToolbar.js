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
import PropTypes from 'prop-types';
import React from 'react';
import EraseIcon from 'react-icons/lib/fa/eraser';

import Dawww from '../../../dawww';
import shared from '../../shared';
import * as constants from '../constants';

const { Box, Button, Stack, Toolbar } = shared.components;
const { DRAW, ERASE, PAN, SELECT } = constants.toolTypes;

function SelectableIconButton(props) {
  const { isSelected, ...rest } = props;

  return (
    <Button
      color={isSelected ? 'primary.main' : undefined}
      variant={isSelected ? 'outlined' : 'text'}
      {...rest}
    />
  );
}

NotesEditorToolbar.propTypes = {
  measureCount: PropTypes.number,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  onDeselectAll: PropTypes.func,
  onDrawToolSelect: PropTypes.func,
  onDuplicate: PropTypes.func,
  onEraseToolSelect: PropTypes.func,
  onOctaveDown: PropTypes.func,
  onOctaveUp: PropTypes.func,
  onPanToolSelect: PropTypes.func,
  onSelectToolSelect: PropTypes.func,
  selectedNotes: PropTypes.arrayOf(PropTypes.object),
  toolType: PropTypes.string,
};

function NotesEditorToolbar(props) {
  const {
    measureCount,
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

  const isOctaveDownButtonDisabled = React.useMemo(
    () =>
      Dawww.someNoteWillMoveOutside(
        measureCount,
        { x: 0, y: 12 },
        selectedNotes,
      ),
    [measureCount, selectedNotes],
  );

  const isOctaveUpButtonDisabled = React.useMemo(
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

export default React.memo(NotesEditorToolbar);
