import PropTypes from 'prop-types';
import React from 'react';
import './AddSequenceButton.scss';

export class AddSequenceButton extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
    style: PropTypes.object,
  }

  render() {
    return (
      <div
        className="add-sequence-button"
        onClick={this.props.onClick}
        style={this.props.style}>
        <div
          className="add-sequence-button__plus__vertical"
        />
        <div
          className="add-sequence-button__plus__horizontal"
        />
      </div>
    );
  }
}
