import classnames from 'classnames';
import React from 'react';
import h from 'react-hyperscript';
import './slot.scss';

export class Slot extends React.PureComponent {
  static propTypes = {
    sectionNumber: React.PropTypes.number.isRequired,
    slotNumber: React.PropTypes.number.isRequired,
  }

  render() {
    return h('.slot', {
      className: this.getClassName(),
      key: this.props.slotNumber,
    }, [
      h('.slot__fill'),
    ]);
  }

  getClassName = () =>
    classnames({
      'slot--inverted': isEven(this.props.sectionNumber),
    });
}

function isEven(x) {
  return (x + 1) % 2 === 0;
}
