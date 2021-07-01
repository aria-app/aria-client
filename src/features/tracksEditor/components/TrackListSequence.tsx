import styled from '@emotion/styled';
import { memo, useCallback } from 'react';

import { Sequence } from '../../../types';
import TrackSequenceNote from './TrackSequenceNote';

interface RootProps {
  isPending: boolean;
  isSelected: boolean;
}

const Root = styled.div<RootProps>(({ isPending, isSelected, theme }) => ({
  display: 'flex',
  height: 64,
  padding: theme.space(1),
  backgroundColor: isSelected
    ? theme.colors.brandPrimary
    : theme.colors.brandSubtle,
  border: `2px solid ${theme.colors.backgroundContrast}`,
  borderRadius: theme.borderRadii.md,
  overflow: 'hidden',
  pointerEvents: isPending ? 'none' : 'auto',
  position: 'relative',
  transition: 'box-shadow 250ms ease, opacity 500ms ease, transform 150ms ease',
}));

export interface TrackListSequenceProps {
  isDragging: boolean;
  isSelected: boolean;
  onOpen: (sequenceToOpen: Sequence) => void;
  onSelect: (sequenceToSelect: Sequence) => void;
  sequence: Sequence;
}

function TrackListSequence(props: TrackListSequenceProps) {
  const { isSelected, onOpen, onSelect, sequence } = props;

  const handleClick = useCallback(() => {
    if (isSelected) return;

    onSelect(sequence);
  }, [isSelected, onSelect, sequence]);

  const handleDoubleClick = useCallback(() => {
    onOpen(sequence);
  }, [onOpen, sequence]);

  return (
    <Root
      isPending={sequence.id < 0}
      isSelected={isSelected}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {sequence.notes.map((note) => (
        <TrackSequenceNote
          isSequenceSelected={isSelected}
          key={note.id}
          note={note}
        />
      ))}
    </Root>
  );
}

export default memo(TrackListSequence);
