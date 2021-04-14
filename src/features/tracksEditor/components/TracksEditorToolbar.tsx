import ContentCopyIcon from '@material-ui/icons/ContentCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import isEmpty from 'lodash/fp/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';

import shared from '../../shared';

const { Button, Stack, Toolbar } = shared.components;

TracksEditorToolbar.propTypes = {
  onSequenceDelete: PropTypes.func,
  onSequenceDuplicate: PropTypes.func,
  onSequenceOpen: PropTypes.func,
  selectedSequence: PropTypes.object,
};

function TracksEditorToolbar(props: any) {
  const {
    onSequenceDelete,
    onSequenceDuplicate,
    onSequenceOpen,
    selectedSequence,
  } = props;

  const isSomeSequenceSelected = !isEmpty(selectedSequence);

  const handleSequenceOpen = React.useCallback(() => {
    onSequenceOpen(selectedSequence);
  }, [onSequenceOpen, selectedSequence]);

  return (
    <Toolbar position="bottom">
      <Stack direction="row" space={2} sx={{ justifyContent: 'flex-end' }}>
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
