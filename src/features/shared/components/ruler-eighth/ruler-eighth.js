import PropTypes from 'prop-types';
import React from 'react';
import h from 'react-hyperscript';
import './ruler-eighth.scss';

export class RulerEighth extends React.PureComponent {
  static propTypes = {
    eighthIndex: PropTypes.number.isRequired,
    measureWidth: PropTypes.number.isRequired,
  }

  render() {
    return h('.ruler-eighth', {
      style: this.getStyle(),
    });
  }

  getStyle = () => ({
    transform: `translateX(${(this.props.eighthIndex + 1) * (this.props.measureWidth / 8)}px)`,
  });
}
