import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import shared from '../../../shared';
import './AddTrackButton.scss';

const { Icon } = shared.components;

export class AddTrackButton extends React.PureComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    songMeasureCount: PropTypes.number.isRequired,
  }

  render() {
    return h('.add-track-button', {
      style: this.getStyle(),
      onClick: this.props.onClick,
    }, [
      h(Icon, {
        className: 'add-track-button__icon',
        icon: 'plus',
        size: 'large',
      }),
      h('.add-track-button__text', [
        'Add Track',
      ]),
    ]);
  }

  getStyle = () => ({
    width: (this.props.songMeasureCount * 64) + 84,
  });
}
