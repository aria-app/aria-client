import isEmpty from 'lodash/fp/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';

import Dawww from '../../../dawww';
import shared from '../../shared';
import * as constants from '../constants';

const { Column, Columns, IconButton, Toolbar } = shared.components;
const { DRAW, ERASE, PAN, SELECT } = constants.toolTypes;

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
      <Columns alignY="center">
        <Column>
          {!areSomeNotesSelected && (
            <IconButton
              icon="arrow-left"
              onClick={onClose}
              title="Back to tracks"
            />
          )}
          {areSomeNotesSelected && (
            <IconButton
              icon="close"
              onClick={onDeselectAll}
              title="Deselect notes"
            />
          )}
        </Column>
        <Column width="content">
          {!areSomeNotesSelected && (
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
          )}
          {areSomeNotesSelected && (
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
              <IconButton
                icon="clone"
                onClick={onDuplicate}
                title="Duplicate"
              />
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
          )}
        </Column>
      </Columns>
    </Toolbar>
  );
}

export default NotesEditorToolbar;
