import isEmpty from 'lodash/fp/isEmpty';
import createStyles from '@material-ui/styles/createStyles';
import withStyles from '@material-ui/styles/withStyles';
import React from 'react';
import Dawww from '../../../dawww';
import shared from '../../shared';
import * as constants from '../constants';

const { IconButton, Toolbar } = shared.components;
const { DRAW, ERASE, PAN, SELECT } = constants.toolTypes;

const styles = (theme) =>
  createStyles({
    root: {
      borderTop: `2px solid ${theme.palette.divider}`,
    },
  });

// export interface NotesEditorToolbarProps extends WithStyles<typeof styles> {
//   isRedoEnabled?: boolean;
//   isUndoEnabled?: boolean;
//   measureCount?: number;
//   onClose?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
//   onDelete?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
//   onDeselectAll?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
//   onDrawToolSelect?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
//   onDuplicate?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
//   onEraseToolSelect?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
//   onOctaveDown?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
//   onOctaveUp?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
//   onPanToolSelect?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
//   onRedo?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
//   onSelectToolSelect?: (
//     e: React.MouseEvent<HTMLDivElement, MouseEvent>,
//   ) => void;
//   onUndo?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
//   selectedNotes?: Array<Note>;
//   toolType?: string;
// }

function NotesEditorToolbar(props) {
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

export default React.memo(withStyles(styles)(NotesEditorToolbar));
