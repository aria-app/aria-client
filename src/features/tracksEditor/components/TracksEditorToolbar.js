import isEmpty from 'lodash/fp/isEmpty';
import withStyles from '@material-ui/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { showIf } from 'react-render-helpers';
import shared from '../../shared';

const { IconButton, Toolbar } = shared.components;

const styles = theme => ({
  root: {
    borderTop: `2px solid ${theme.palette.divider}`,
  },
});

function TracksEditorToolbar(props) {
  const {
    classes,
    isRedoEnabled,
    isUndoEnabled,
    onRedo,
    onSequenceDelete,
    onSequenceDuplicate,
    onSequenceOpen,
    onUndo,
    selectedSequence = {},
  } = props;

  const handleSequenceOpen = React.useCallback(() => {
    onSequenceOpen(selectedSequence);
  }, [onSequenceOpen, selectedSequence]);

  return (
    <Toolbar
      className={classes.root}
      position="top"
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

TracksEditorToolbar.propTypes = {
  isRedoEnabled: PropTypes.bool,
  isUndoEnabled: PropTypes.bool,
  onRedo: PropTypes.func,
  onSequenceDelete: PropTypes.func,
  onSequenceDuplicate: PropTypes.func,
  onSequenceOpen: PropTypes.func,
  onUndo: PropTypes.func,
  selectedSequence: PropTypes.object,
};

export default React.memo(withStyles(styles)(TracksEditorToolbar));
