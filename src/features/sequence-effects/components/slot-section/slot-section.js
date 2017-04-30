import add from 'lodash/fp/add';
import range from 'lodash/fp/range';
import map from 'lodash/fp/map';
import multiply from 'lodash/fp/multiply';
import React from 'react';
import h from 'react-hyperscript';
// import { Slot } from '../slot/slot';
import './slot-section.scss';

export class SlotSection extends React.PureComponent {
  static propTypes = {
    sectionNumber: React.PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      slotRange: this.getSlotRange(),
    };
  }

  componentWillReceiveProps() {
    this.setState({
      slotRange: this.getSlotRange(),
    });
  }

  render() {
    return h('.slot-section', {
      key: this.props.sectionNumber,
    }, [
      ...this.state.slotRange.map(slotNumber => h(Slot, {
        key: slotNumber,
        sectionNumber: this.props.sectionNumber,
        slotNumber,
      })),
    ]);
  }

  getSlotRange = () =>
    map(add(multiply(this.props.sectionNumber, 8)))(range(0, 8));
}
