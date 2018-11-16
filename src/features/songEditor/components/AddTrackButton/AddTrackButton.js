import PropTypes from 'prop-types';
import React from 'react';
import './AddTrackButton.scss';

export function AddTrackButton(props) {
  return (
    <div
      className="add-track-button"
      onClick={props.onClick}
      style={props.style}>
      <div
        className="add-track-button__plus__vertical"
      />
      <div
        className="add-track-button__plus__horizontal"
      />
    </div>
  );
}

AddTrackButton.propTypes = {
  onClick: PropTypes.func,
  style: PropTypes.object,
};
