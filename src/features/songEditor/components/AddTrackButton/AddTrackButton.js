import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const AddTrackButtonPlusHorizontal = styled.div`
  background-color: white;
  height: 1px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 9px;
`;

const AddTrackButtonPlusVertical = styled.div`
  background-color: white;
  height: 9px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1px;
`;

const StyledAddTrackButton = styled.div`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.5);
  border: 1px solid white;
  cursor: pointer;
  display: flex;
  flex: 0 0 auto;
  height: 36px;
  justify-content: center;
  position: relative;
  transform: scale(1.0);
  transition: transform 0.2s ease;
  width: 36px;
  &:hover:not(:active) {
    transform: scale(1.1);
    background-color: rgba(255, 255, 255, 0.6);
  }
  &:active {
    transform: scale(0.9);
  }
`;

export function AddTrackButton(props) {
  return (
    <StyledAddTrackButton
      onClick={props.onClick}
      style={props.style}>
      <AddTrackButtonPlusVertical
        className="add-track-button__plus__vertical"
      />
      <AddTrackButtonPlusHorizontal
        className="add-track-button__plus__horizontal"
      />
    </StyledAddTrackButton>
  );
}

AddTrackButton.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object,
};
