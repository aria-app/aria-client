import ContentCopyIcon from '@material-ui/icons/ContentCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import isEmpty from 'lodash/fp/isEmpty';
import { memo } from 'react';

import { Sequence } from '../../../types';
import { Button, Stack, Toolbar } from '../../shared';

export interface TracksEditorToolbarProps {
  onSequenceDelete: (e: MouseEvent) => void;
  onSequenceDuplicate: (e: MouseEvent) => void;
  onSequenceOpen: () => void;
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
    <Toolbar position="bottom">
      <Stack direction="row" space={2} sx={{ justifyContent: 'flex-end' }}>
        {isSomeSequenceSelected && (
          <>
            <Button
              onClick={onSequenceOpen}
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

export default memo(TracksEditorToolbar);
