import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import './ruler-eighth.scss';

const measurePreviewWidth = 64;

export class RulerEighth extends React.PureComponent {
  static propTypes = {
    eighthIndex: PropTypes.number.isRequired,
  }

  render() {
    return h('.ruler-eighth', {
      style: this.getStyle(),
    });
  }

  getStyle = () => ({
    transform: `translateX(${(this.props.eighthIndex + 1) * (measurePreviewWidth / 8)}px)`,
  });
}
