import { PropTypes } from 'react';
import h from 'react-hyperscript';
import _ from 'lodash';
import { compose, mapProps, onlyUpdateForKeys, setPropTypes, withHandlers } from 'recompose';
import './slots.scss';

const component = ({ rows }) => h('.slots', rows);

const composed = compose([
  setPropTypes({
    measureCount: PropTypes.number,
    drawNote: PropTypes.func,
    playNote: PropTypes.func,
  }),
  withHandlers({
    handleSlotPress: ({ drawNote, playNote }) => (slot, time) => {
      playNote(slot.frequency);
      drawNote({
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
    scale,
    }) => ({
      rows: getRows(handleSlotPress, measureCount, scale),
    })
  ),
  onlyUpdateForKeys(['measureCount']),
])(component);

export const Slots = composed;

function getRows(handleSlotPress, measureCount, scale) {
  return scale.map(scaleStep => h('.slots__row', {
    className: `slots__row--${scaleStep.letter}`,
  }, _.times(4 * measureCount, sectionNumber =>
    h('.slots__row__section', _.times(8, n =>
      h('.slots__slot', {
        onClick: () => handleSlotPress(scaleStep, n + sectionNumber * 8),
      }, h('.slots__slot__fill'))
    ))
  )));
}
