import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import styled from '@material-ui/styles/styled';

const DraggableWrapper = styled('div')({
  position: 'absolute',
  transition: 'transform 200ms ease',
});

const StyledRulerResizer = styled(({ isDragging, isDisabled, ...rest }) => (
  <div {...rest} />
))(props => ({
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: '1px solid white',
  cursor: 'col-resize',
  height: 32,
  left: 0,
  position: 'absolute',
  top: 3,
  transition: 'box-shadow 250ms ease, opacity 500ms ease, transform 350ms ease',
  width: 24,
  '&:hover:not(:active)': {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  '&:active': {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  ':after': {
    borderLeft: '2px dotted white',
    borderRight: '2px dotted white',
    content: "''",
    display: 'block',
    height: 10,
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: 4,
  },
  ...(props.isDragging
    ? {
        boxShadow: '0 4px 16px 4px rgba(0, 0, 0, 0.25)',
        opacity: 0.8,
        transform: 'translateY(-4px) scale(1.05)',
        transition:
          'box-shadow 250ms ease, opacity 500ms ease, transform 150ms ease',
      }
    : {}),
}));

RulerResizer.propTypes = {
  size: PropTypes.number,
};

export default function RulerResizer(props) {
  const [isDragging, setIsDragging] = useState(false);

  const getPosition = () => ({
    x: props.size * 64 + 16,
    y: 0,
  });

  const handleDrag = (e, dragData) => {
    props.onSizeChange(
      Math.max(1, props.size + Math.round(dragData.deltaX / 64)),
    );
  };

  return (
    <Draggable
      axis="x"
      bounds={{
        left: 64 - 16,
      }}
      grid={[64, 0]}
      onDrag={handleDrag}
      onStart={() => setIsDragging(true)}
      onStop={() => setIsDragging(false)}
      position={getPosition()}
    >
      <DraggableWrapper>
        <StyledRulerResizer isDragging={isDragging} />
      </DraggableWrapper>
    </Draggable>
  );
}
