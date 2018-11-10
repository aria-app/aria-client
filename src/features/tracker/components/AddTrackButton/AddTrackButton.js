import PropTypes from 'prop-types';
import React from 'react';
import './AddTrackButton.scss';

export class AddTrackButton extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    songMeasureCount: PropTypes.number.isRequired,
  }

  render() {
    return (
      <div
        className="add-track-button"
        onClick={this.handleClick}>
        <div
          className="add-track-button__plus__vertical"
        />
        <div
          className="add-track-button__plus__horizontal"
        />
      </div>
    );
  }

  handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.props.onClick();
  };
}
