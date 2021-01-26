import styled from '@emotion/styled';
import isEmpty from 'lodash/fp/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';

import Dawww from '../../../dawww';
import shared from '../../shared';
import * as constants from '../constants';

const { IconButton, Toolbar } = shared.components;
const { DRAW, ERASE, PAN, SELECT } = constants.toolTypes;

const Root = styled(Toolbar)(({ theme }) => ({
  borderTop: `2px solid ${theme.palette.divider}`,
}));

NotesEditorToolbar.propTypes = {
  isRedoEnabled: PropTypes.bool,
  isUndoEnabled: PropTypes.bool,
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
  onRedo: PropTypes.func,
  onSelectToolSelect: PropTypes.func,
  onUndo: PropTypes.func,
  selectedNotes: PropTypes.arrayOf(PropTypes.object),
  toolType: PropTypes.string,
};

function NotesEditorToolbar(props) {
  const {
    isRedoEnabled,
    isUndoEnabled,
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
    onRedo,
    onSelectToolSelect,
    onUndo,
    selectedNotes,
    toolType,
  } = props;

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
    <Root
      isAlternate={!isEmpty(selectedNotes)}
      leftItems={
        <React.Fragment>
          <IconButton
            icon="arrow-left"
            onClick={onClose}
            title="Back to tracks"
          />
        </React.Fragment>
      }
      leftItemsAlt={
        <React.Fragment>
          <IconButton
            icon="close"
            onClick={onDeselectAll}
            title="Deselect notes"
          />
        </React.Fragment>
      }
      rightItems={
        <React.Fragment>
          <IconButton
            icon="undo"
            isDisabled={!isUndoEnabled}
            onClick={onUndo}
            title="Undo"
          />
          <IconButton
            icon="redo"
            isDisabled={!isRedoEnabled}
            onClick={onRedo}
            title="Redo"
          />
          <IconButton
            icon="mouse-pointer"
            isActive={toolType === SELECT}
            onClick={onSelectToolSelect}
            title="Select"
          />
          <IconButton
            icon="pencil"
            isActive={toolType === DRAW}
            onClick={onDrawToolSelect}
            title="Draw"
          />
          <IconButton
            icon="eraser"
            isActive={toolType === ERASE}
            onClick={onEraseToolSelect}
            title="Erase"
          />
          <IconButton
            icon="hand-paper-o"
            isActive={toolType === PAN}
            onClick={onPanToolSelect}
            title="Pan"
          />
        </React.Fragment>
      }
      rightItemsAlt={
        <React.Fragment>
          <IconButton
            icon="undo"
            isDisabled={!isUndoEnabled}
            onClick={onUndo}
            title="Undo"
          />
          <IconButton
            icon="redo"
            isDisabled={!isRedoEnabled}
            onClick={onRedo}
            title="Redo"
          />
          <IconButton icon="trash" onClick={onDelete} title="Delete" />
          <IconButton icon="clone" onClick={onDuplicate} title="Duplicate" />
          <IconButton
            icon="arrow-up"
            isDisabled={isOctaveUpButtonDisabled}
            onClick={onOctaveUp}
            title="Octave up"
          />
          <IconButton
            icon="arrow-down"
            isDisabled={isOctaveDownButtonDisabled}
            onClick={onOctaveDown}
            title="Octave down"
          />
        </React.Fragment>
      }
    />
  );
}

export default React.memo(NotesEditorToolbar);
