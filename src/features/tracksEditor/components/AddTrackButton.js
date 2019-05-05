import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';

const AddTrackButtonPlusHorizontal = styled.div({
  backgroundColor: 'white',
  height: 1,
  left: '50%',
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: 9,
});

const AddTrackButtonPlusVertical = styled.div({
  backgroundColor: 'white',
  height: 9,
  left: '50%',
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1,
});

const StyledAddTrackButton = styled.div({
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: '1px solid white',
  cursor: 'pointer',
  display: 'flex',
  flex: '0 0 auto',
  height: 36,
  justifyContent: 'center',
  position: 'relative',
  transform: 'scale(1)',
  transition: 'transform 0.2s ease',
  width: 36,
  '&:hover:not(:active)': {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    transform: 'scale(1.1)',
  },
  '&:active': {
    transform: 'scale(0.9)',
  },
});

export default function AddTrackButton(props) {
  return (
    <StyledAddTrackButton onClick={props.onClick} style={props.style}>
      <AddTrackButtonPlusVertical className="add-track-button__plus__vertical" />
      <AddTrackButtonPlusHorizontal className="add-track-button__plus__horizontal" />
    </StyledAddTrackButton>
  );
}

AddTrackButton.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object,
};
