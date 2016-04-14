import React from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import './zen-slots.scss';
import { getLetter } from 'helpers/zen-pitches/zen-pitches';
import { getFrequency } from 'helpers/zen-scale/zen-scale';

export const ZenSlots = React.createClass({
  propTypes: {
    measureCount: React.PropTypes.number,
    scale: React.PropTypes.array,
    synth: React.PropTypes.object,
    onSlotPress: React.PropTypes.func,
  },
  shouldComponentUpdate(nextProps) {
    return nextProps.measureCount !== this.props.measureCount;
  },
  render() {
    return h('.zen-slots', this.getRows());
  },
  handleSlotPress(slot, time) {
    this.props.synth.triggerAttackRelease(getFrequency(slot), '32n');
    this.props.onSlotPress({
      octave: slot.octave,
      pitch: slot.pitch,
      length: '32n',
      time,
    });
  },
  getRows() {
    return this.props.scale.map(step => h(
      `.zen-slots__row.zen-slots__row--${getLetter(step.pitch)}`,
      this.getSections(step)
    ));
  },
  getSections(step) {
    return _.range(4 * this.props.measureCount).map(n =>
      h('.zen-slots__row__section', this.getSlots(step, n))
    );
  },
  getSlots(step, sectionNumber) {
    return _.range(8).map(n => h(
      '.zen-slots__slot', {
        onClick: () => this.handleSlotPress(
          step,
          n + (sectionNumber * 8)
        ),
      }, [
        h('.zen-slots__slot__fill'),
      ])
    );
  },
});
