import { PropTypes } from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import { compose, mapProps, onlyUpdateForKeys, setPropTypes, withHandlers } from 'recompose';
import { getFrequency, scale } from '../../helpers/zen-scale/zen-scale';
import { getLetter } from '../../helpers/zen-pitches/zen-pitches';
import './zen-slots.scss';

const component = ({ rows }) =>
  h('.zen-slots', rows);

export const ZenSlots = compose([
  setPropTypes({
    measureCount: PropTypes.number,
    synth: PropTypes.object,
    onSlotPress: PropTypes.func,
  }),
  withHandlers({
    handleSlotPress: ({ onSlotPress, synth }) => (slot, time) => {
      synth.triggerAttackRelease(getFrequency(slot), '32n');
      onSlotPress({
        octave: slot.octave,
        pitch: slot.pitch,
        length: '32n',
        time,
      });
    },
  }),
  mapProps(({
    handleSlotPress,
    measureCount,
    }) => ({
      rows: scale.map(step => h('.zen-slots__row', {
        className: `zen-slots__row--${getLetter(step.pitch)}`,
      }, _.times(4 * measureCount, sectionNumber =>
        h('.zen-slots__row__section', _.times(8, n =>
          h('.zen-slots__slot', {
            onClick: () => handleSlotPress(step, n + sectionNumber * 8),
          }, h('.zen-slots__slot__fill'))
        ))
      ))),
    })
  ),
  onlyUpdateForKeys(['measureCount']),
])(component);
