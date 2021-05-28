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
  padding: theme.spacing(1),
  backgroundColor: isSelected
    ? theme.palette.primary.main
    : theme.palette.primary.light,
  border: `2px solid ${theme.palette.background.paper}`,
  borderRadius: (theme.shape.borderRadius as number) * 2,
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
