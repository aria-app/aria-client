import React, { PropTypes } from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import './zen-slots.scss';
import { pitches } from 'helpers/zen-pitches/zen-pitches';

export const ZenSlots = React.createClass({
  propTypes: {
    scale: PropTypes.array,
    onSlotPress: PropTypes.func,
  },
  shouldComponentUpdate(nextProps) {
    return !_.isEqual(nextProps.scale, this.props.scale);
  },
  render() {
    return (
      h('div.zen-slots', this.getRows())
    );
  },
  handleSlotPress(note) {
    this.props.onSlotPress(note);
  },
  getRows() {
    return this.props.scale.map(note => {
      const name = note.pitch === pitches.C
        ? 'div.zen-slots__row.zen-slots__row--c'
        : 'div.zen-slots__row';
      return h(name, this.getSections(note));
    });
  },
  getSections(note) {
    return _.range(4).map(n =>
      h('div.zen-slots__section', this.getSlots(note, n))
    );
  },
  getSlots(note, sectionNumber) {
    const notesPerSection = 8;
    return _.range(notesPerSection).map(n =>
      h('div.zen-slots__slot', {
        onClick: () => this.handleSlotPress({
          frequency: note.frequency,
          octave: note.octave,
          pitch: note.pitch,
          time: n + (sectionNumber * notesPerSection),
        }),
      })
    );
  },

});
