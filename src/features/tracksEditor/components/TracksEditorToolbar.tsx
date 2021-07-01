import { IconButton, Stack, Toolbar } from 'aria-ui';
import isEmpty from 'lodash/fp/isEmpty';
import ContentCopyIcon from 'mdi-react/ContentCopyIcon';
import DeleteIcon from 'mdi-react/DeleteIcon';
import EditIcon from 'mdi-react/EditIcon';
import { memo, MouseEventHandler } from 'react';

import { Sequence } from '../../../types';

export interface TracksEditorToolbarProps {
  onSequenceDelete: MouseEventHandler<HTMLButtonElement>;
  onSequenceDuplicate: MouseEventHandler<HTMLButtonElement>;
  onSequenceOpen: MouseEventHandler<HTMLButtonElement>;
  selectedSequence?: Sequence;
}

function TracksEditorToolbar(props: TracksEditorToolbarProps) {
  const {
    onSequenceDelete,
    onSequenceDuplicate,
    onSequenceOpen,
    selectedSequence,
  } = props;

  const isSomeSequenceSelected = !isEmpty(selectedSequence);

  return (
    <Toolbar padding={2}>
      <Stack direction="row" space={2} sx={{ justifyContent: 'flex-end' }}>
        {isSomeSequenceSelected && (
          <>
            <IconButton icon={<EditIcon />} onClick={onSequenceOpen} />
            <IconButton
              icon={<ContentCopyIcon />}
              onClick={onSequenceDuplicate}
            />
            <IconButton icon={<DeleteIcon />} onClick={onSequenceDelete} />
          </>
        )}
      </Stack>
    </Toolbar>
  );
}

export default memo(TracksEditorToolbar);
