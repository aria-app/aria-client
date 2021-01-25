import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';

import TrackSequenceNote from './TrackSequenceNote';

const Root = styled.div(({ isSelected, theme }) => ({
  display: 'flex',
  height: 64,
  padding: theme.spacing(1),
  backgroundColor: isSelected
    ? theme.palette.primary.main
    : theme.palette.primary.light,
  border: `2px solid ${theme.palette.background.paper}`,
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  position: 'relative',
  transition: 'box-shadow 250ms ease, opacity 500ms ease, transform 150ms ease',
}));

TrackSequence.propTypes = {
  isDragging: PropTypes.bool,
  isSelected: PropTypes.bool,
  onOpen: PropTypes.func,
  onSelect: PropTypes.func,
  sequence: PropTypes.object,
};

function TrackSequence(props) {
  const { isSelected, onOpen, onSelect, sequence } = props;

  const handleClick = React.useCallback(() => {
    if (isSelected) return;

    onSelect(sequence);
  }, [isSelected, onSelect, sequence]);

  const handleDoubleClick = React.useCallback(() => {
    onOpen(sequence);
  }, [onOpen, sequence]);

  return (
    <Root
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

export default React.memo(TrackSequence);
