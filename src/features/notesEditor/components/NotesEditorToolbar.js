import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import CloseIcon from '@material-ui/icons/Close';
import ContentCopyIcon from '@material-ui/icons/ContentCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import NearMeIcon from '@material-ui/icons/NearMe';
import PanToolIcon from '@material-ui/icons/PanTool';
import RedoIcon from '@material-ui/icons/Redo';
import UndoIcon from '@material-ui/icons/Undo';
import isEmpty from 'lodash/fp/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import EraseIcon from 'react-icons/lib/fa/eraser';

import Dawww from '../../../dawww';
import shared from '../../shared';
import * as constants from '../constants';

const { Button, Column, Columns, Toolbar } = shared.components;
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
            <Button
              onClick={onClose}
              startIcon={<ArrowBackIcon />}
              title="Back to tracks"
              variant="text"
            />
          )}
          {areSomeNotesSelected && (
            <Button
              onClick={onDeselectAll}
              startIcon={<CloseIcon />}
              title="Deselect notes"
              variant="text"
            />
          )}
        </Column>
        <Column width="content">
          <Columns space={2}>
            <Column width="content">
              <Button
                disabled={!isUndoEnabled}
                onClick={onUndo}
                startIcon={<UndoIcon />}
                title="Undo"
                variant="text"
              />
            </Column>
            <Column width="content">
              <Button
                disabled={!isRedoEnabled}
                onClick={onRedo}
                startIcon={<RedoIcon />}
                title="Redo"
                variant="text"
              />
            </Column>
            <Column width="content">
              {!areSomeNotesSelected && (
                <React.Fragment>
                  <Columns space={2}>
                    <Column width="content">
                      <SelectableIconButton
                        isSelected={toolType === SELECT}
                        onClick={onSelectToolSelect}
                        startIcon={<NearMeIcon />}
                        title="Select"
                      />
                    </Column>
                    <Column width="content">
                      <SelectableIconButton
                        isSelected={toolType === DRAW}
                        onClick={onDrawToolSelect}
                        startIcon={<EditIcon />}
                        title="Draw"
                      />
                    </Column>
                    <Column width="content">
                      <SelectableIconButton
                        isSelected={toolType === ERASE}
                        onClick={onEraseToolSelect}
                        startIcon={<EraseIcon size={24} />}
                        title="Erase"
                      />
                    </Column>
                    <Column width="content">
                      <SelectableIconButton
                        isSelected={toolType === PAN}
                        onClick={onPanToolSelect}
                        startIcon={<PanToolIcon />}
                        title="Pan"
                      />
                    </Column>
                  </Columns>
                </React.Fragment>
              )}
              {areSomeNotesSelected && (
                <React.Fragment>
                  <Columns space={2}>
                    <Column width="content">
                      <Button
                        onClick={onDelete}
                        startIcon={<DeleteIcon />}
                        title="Delete"
                        variant="text"
                      />
                    </Column>
                    <Column width="content">
                      <Button
                        onClick={onDuplicate}
                        startIcon={<ContentCopyIcon />}
                        title="Duplicate"
                        variant="text"
                      />
                    </Column>
                    <Column width="content">
                      <Button
                        disabled={isOctaveUpButtonDisabled}
                        onClick={onOctaveUp}
                        startIcon={<ArrowUpwardIcon />}
                        title="Octave up"
                        variant="text"
                      />
                    </Column>
                    <Column width="content">
                      <Button
                        disabled={isOctaveDownButtonDisabled}
                        onClick={onOctaveDown}
                        startIcon={<ArrowDownwardIcon />}
                        title="Octave down"
                        variant="text"
                      />
                    </Column>
                  </Columns>
                </React.Fragment>
              )}
            </Column>
          </Columns>
        </Column>
      </Columns>
    </Toolbar>
  );
}

export default React.memo(NotesEditorToolbar);
