import styled from '@emotion/styled';
import isEmpty from 'lodash/fp/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import { showIf } from 'react-render-helpers';

import shared from '../../shared';

const { IconButton, Toolbar } = shared.components;

const Root = styled(Toolbar)(({ theme }) => ({
  borderTop: `2px solid ${theme.palette.divider}`,
}));

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

function TracksEditorToolbar(props) {
  const {
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
    <Root
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

export default React.memo(TracksEditorToolbar);
