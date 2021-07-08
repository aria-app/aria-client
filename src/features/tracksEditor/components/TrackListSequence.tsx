import { Box } from 'aria-ui';
import { FC, memo, useCallback } from 'react';

import { Sequence } from '../../../types';
import { TrackSequenceNote } from './TrackSequenceNote';

export interface TrackListSequenceProps {
  isDragging: boolean;
  isSelected: boolean;
  onOpen: (sequenceToOpen: Sequence) => void;
  onSelect: (sequenceToSelect: Sequence) => void;
  sequence: Sequence;
}

export const TrackListSequence: FC<TrackListSequenceProps> = memo((props) => {
  const { isSelected, onOpen, onSelect, sequence } = props;

  const handleClick = useCallback(() => {
    if (isSelected) return;

    onSelect(sequence);
  }, [isSelected, onSelect, sequence]);

  const handleDoubleClick = useCallback(() => {
    onOpen(sequence);
  }, [onOpen, sequence]);

  return (
    <Box
      backgroundColor={isSelected ? 'brandPrimary' : 'brandSubtle'}
      borderColor="backgroundContrast"
      borderRadius="md"
      borderWidth={2}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      padding={1}
      sx={{
        display: 'flex',
        height: 64,
        overflow: 'hidden',
        pointerEvents: sequence.id < 0 ? 'none' : 'auto',
        position: 'relative',
        transition:
          'box-shadow 250ms ease, opacity 500ms ease, transform 150ms ease',
      }}
    >
      {sequence.notes.map((note) => (
        <TrackSequenceNote
          isSequenceSelected={isSelected}
          key={note.id}
          note={note}
        />
      ))}
    </Box>
  );
});
