import styled from '@material-ui/styles/styled';
import { transparentize } from 'polished';
import PropTypes from 'prop-types';
import React from 'react';

const AddTrackButtonPlusHorizontal = styled('div')(props => ({
  backgroundColor: props.theme.palette.text.primary,
  height: 1,
  left: '50%',
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: 9,
}));

const AddTrackButtonPlusVertical = styled('div')(props => ({
  backgroundColor: props.theme.palette.text.primary,
  height: 9,
  left: '50%',
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1,
}));

const StyledAddTrackButton = styled('div')(props => ({
  alignItems: 'center',
  backgroundColor: transparentize(0.5, props.theme.palette.text.primary),
  border: `1px solid ${props.theme.palette.text.primary}`,
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
    backgroundColor: transparentize(0.6, props.theme.palette.text.primary),
    transform: 'scale(1.1)',
  },
  '&:active': {
    transform: 'scale(0.9)',
  },
}));

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
