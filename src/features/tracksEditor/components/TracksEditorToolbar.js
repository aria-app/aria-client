import ContentCopyIcon from '@material-ui/icons/ContentCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import RedoIcon from '@material-ui/icons/Redo';
import UndoIcon from '@material-ui/icons/Undo';
import isEmpty from 'lodash/fp/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';

import shared from '../../shared';

const { Box, Button, Stack, Toolbar } = shared.components;

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

  const isSomeSequenceSelected = !isEmpty(selectedSequence);

  const handleSequenceOpen = React.useCallback(() => {
    onSequenceOpen(selectedSequence);
  }, [onSequenceOpen, selectedSequence]);

  return (
    <Toolbar position="bottom">
      <Stack direction="row" space={2}>
        <Box sx={{ flexGrow: 1 }}>
          <Button
            disabled={!isUndoEnabled}
            onClick={onUndo}
            startIcon={<UndoIcon />}
            title="Undo"
            variant="text"
          />
          {isRedoEnabled && (
            <Button
              onClick={onRedo}
              startIcon={<RedoIcon />}
              title="Redo"
              variant="text"
            />
          )}
        </Box>
        {isSomeSequenceSelected && (
          <>
            <Button
              onClick={handleSequenceOpen}
              startIcon={<EditIcon />}
              variant="text"
            />
            <Button
              onClick={onSequenceDuplicate}
              startIcon={<ContentCopyIcon />}
              variant="text"
            />
            <Button
              onClick={onSequenceDelete}
              startIcon={<DeleteIcon />}
              variant="text"
            />
          </>
        )}
      </Stack>
    </Toolbar>
  );
}

export default React.memo(TracksEditorToolbar);
