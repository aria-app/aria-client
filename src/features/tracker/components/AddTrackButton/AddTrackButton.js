import PropTypes from 'prop-types';
import React from 'react';
import './AddTrackButton.scss';

export class AddTrackButton extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    style: PropTypes.object,
  }

  render() {
    return (
      <div
        className="add-track-button"
        onClick={this.handleClick}
        style={this.props.style}>
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
