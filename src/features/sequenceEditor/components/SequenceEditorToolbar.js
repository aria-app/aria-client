import Dawww from 'dawww';
import isEmpty from 'lodash/fp/isEmpty';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import shared from '../../shared';
import * as constants from '../constants';

const { IconButton, Toolbar } = shared.components;
const { DRAW, ERASE, PAN, SELECT } = constants.toolTypes;

const styles = {
  root: {},
};

function SequenceEditorToolbar(props) {
  const {
    classes,
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
    <Toolbar
      className={classes.root}
      isAlternate={!isEmpty(selectedNotes)}
      leftItems={
        <React.Fragment>
          <IconButton
            icon="arrow-left"
            onClick={onClose}
            toolTip="Back to tracks"
          />
        </React.Fragment>
      }
      leftItemsAlt={
        <React.Fragment>
          <IconButton
            icon="close"
            onClick={onDeselectAll}
            toolTip="Deselect notes"
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
            isActive={toolType === SELECT}
            icon="mouse-pointer"
            onClick={onSelectToolSelect}
            title="Select"
          />
          <IconButton
            isActive={toolType === DRAW}
            icon="pencil"
            onClick={onDrawToolSelect}
            title="Draw"
          />
          <IconButton
            isActive={toolType === ERASE}
            icon="eraser"
            onClick={onEraseToolSelect}
            title="Erase"
          />
          <IconButton
            isActive={toolType === PAN}
            icon="hand-paper-o"
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
            toolTip="Octave up"
          />
          <IconButton
            icon="arrow-down"
            isDisabled={isOctaveDownButtonDisabled}
            onClick={onOctaveDown}
            toolTip="Octave down"
          />
        </React.Fragment>
      }
    />
  );
}

SequenceEditorToolbar.propTypes = {
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

export default React.memo(withStyles(styles)(SequenceEditorToolbar));
