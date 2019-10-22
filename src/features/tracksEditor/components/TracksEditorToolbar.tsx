import isEmpty from 'lodash/fp/isEmpty';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import React from 'react';
import { showIf } from 'react-render-helpers';
import { SequenceWithNotes } from '../../../types';
import shared from '../../shared';

const { IconButton, Toolbar } = shared.components;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      borderTop: `2px solid ${theme.palette.divider}`,
    },
  });

export interface TracksEditorToolbarProps extends WithStyles<typeof styles> {
  isRedoEnabled?: boolean;
  isUndoEnabled?: boolean;
  onRedo?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onSequenceDelete?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onSequenceDuplicate?: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
  onSequenceOpen?: (sequence: SequenceWithNotes) => void;
  onUndo?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  selectedSequence?: SequenceWithNotes;
}

function TracksEditorToolbar(props: TracksEditorToolbarProps) {
  const {
    classes,
    isRedoEnabled,
    isUndoEnabled,
    onRedo,
    onSequenceDelete,
    onSequenceDuplicate,
    onSequenceOpen,
    onUndo,
    selectedSequence,
  } = props;

  const handleSequenceOpen = React.useCallback(() => {
    onSequenceOpen(selectedSequence);
  }, [onSequenceOpen, selectedSequence]);

  return (
    <Toolbar
      className={classes.root}
      isAlternate={!isEmpty(selectedSequence)}
      leftItems={
        <React.Fragment>
          <IconButton
            icon="undo"
            isDisabled={!isUndoEnabled}
            onClick={onUndo}
            title="Undo"
          />
          {showIf(isRedoEnabled)(
            <IconButton
              icon="redo"
              isDisabled={!isRedoEnabled}
              onClick={onRedo}
              title="Redo"
            />,
          )}
        </React.Fragment>
      }
      leftItemsAlt={
        <React.Fragment>
          <IconButton
            icon="undo"
            isDisabled={!isUndoEnabled}
            onClick={onUndo}
            title="Undo"
          />
          {showIf(isRedoEnabled)(
            <IconButton
              icon="redo"
              isDisabled={!isRedoEnabled}
              onClick={onRedo}
              title="Redo"
            />,
          )}
        </React.Fragment>
      }
      rightItemsAlt={
        <React.Fragment>
          <IconButton icon="pencil" onClick={handleSequenceOpen} />
          <IconButton icon="clone" onClick={onSequenceDuplicate} />
          <IconButton icon="trash" onClick={onSequenceDelete} />
        </React.Fragment>
      }
    />
  );
}

export default React.memo(withStyles(styles)(TracksEditorToolbar));
