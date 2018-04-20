import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import './AddTrackButton.scss';

export class AddTrackButton extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    songMeasureCount: PropTypes.number.isRequired,
  }

  render() {
    return h('.add-track-button', {
      onClick: this.handleClick,
    }, [
      h('.add-track-button__plus__vertical'),
      h('.add-track-button__plus__horizontal'),
    ]);
  }

  handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.props.onClick();
  };
}
